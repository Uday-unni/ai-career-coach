from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from apps.applications.models import JobApplication
from .models import AIResult
from .serializers import AIResultSerializer
from .prompts import resume_analysis_prompt, cover_letter_prompt
from .client import call_gemini, call_gemini_json


class AnalyzeResumeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        application_id = request.data.get('application_id')

        if not application_id:
            return Response(
                {"error": "application_id is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            application = JobApplication.objects.get(
                id=application_id,
                user=request.user
            )
        except JobApplication.DoesNotExist:
            return Response(
                {"error": "Application not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check resume exists
        try:
            resume_text = request.user.resume.extracted_text
            if not resume_text:
                return Response(
                    {"error": "Resume has no text. Please re-upload."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception:
            return Response(
                {"error": "Please upload a resume first."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check job description exists
        if not application.job_description:
            return Response(
                {"error": "Please add a job description first."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Build prompt and call Gemini
            prompt = resume_analysis_prompt(
                resume_text,
                application.job_description
            )
            result = call_gemini_json(prompt)

            # Save or update AIResult
            ai_result, created = AIResult.objects.get_or_create(
                application=application
            )
            ai_result.match_score = result.get('match_score', 0)
            ai_result.strengths = result.get('strengths', [])
            ai_result.gaps = result.get('gaps', [])
            ai_result.suggestions = result.get('suggestions', [])
            ai_result.save()

            return Response(
                AIResultSerializer(ai_result).data,
                status=status.HTTP_200_OK
            )

        except ValueError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class GenerateCoverLetterView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        application_id = request.data.get('application_id')

        if not application_id:
            return Response(
                {"error": "application_id is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            application = JobApplication.objects.get(
                id=application_id,
                user=request.user
            )
        except JobApplication.DoesNotExist:
            return Response(
                {"error": "Application not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            resume_text = request.user.resume.extracted_text
        except Exception:
            return Response(
                {"error": "Please upload a resume first."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Build prompt and call Gemini
            prompt = cover_letter_prompt(
                resume_text,
                application.job_description,
                request.user.name
            )
            cover_letter = call_gemini(prompt)

            # Save to AIResult
            ai_result, created = AIResult.objects.get_or_create(
                application=application
            )
            ai_result.cover_letter = cover_letter
            ai_result.save()

            return Response({"cover_letter": cover_letter})

        except ValueError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class AIResultView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            ai_result = AIResult.objects.get(
                application__id=id,
                application__user=request.user
            )
            return Response(AIResultSerializer(ai_result).data)
        except AIResult.DoesNotExist:
            return Response(
                {"error": "No analysis found for this application."},
                status=status.HTTP_404_NOT_FOUND
            )