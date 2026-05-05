from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import GithubScan
from .prompts import github_analysis_prompt
from .scraper import scrape_github
from .serializers import GithubScanSerializer
from apps.ai_analysis.client import call_gemini_json
from apps.applications.models import JobApplication


class GithubScanView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        github_username = request.data.get('github_username')
        application_id = request.data.get('application_id')

        if not github_username:
            return Response(
                {"error": "github_username is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        if not application_id:
            return Response(
                {"error": "application_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            job = JobApplication.objects.get(
                id=application_id,
                user=request.user
            )
        except JobApplication.DoesNotExist:
            return Response(
                {"error": "Application not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            # 1. Scrape GitHub
            repos = scrape_github(github_username)

            # 2. Build prompt and call Gemini
            prompt = github_analysis_prompt(repos, job.job_description)
            result = call_gemini_json(prompt)

            # 3. Save to database ← this was missing!
            scan = GithubScan.objects.create(
                user=request.user,
                github_username=github_username,
                repos_data=repos,
                profile_score=result.get('profile_score', 0),
                technical_strengths=result.get('technical_strengths', []),
                missing_skills=result.get('missing_skills', []),
                standout_projects=result.get('standout_projects', []),
                suggestions=result.get('suggestions', [])
            )

            # 4. Return response ← this was missing!
            return Response(
                GithubScanSerializer(scan).data,
                status=status.HTTP_201_CREATED
            )

        except ValueError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class GithubScanResultView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            scan = GithubScan.objects.filter(
                user=request.user,
                id=id
            ).latest('created_at')
            return Response(GithubScanSerializer(scan).data)
        except GithubScan.DoesNotExist:
            return Response(
                {"error": "No scan found"},
                status=status.HTTP_404_NOT_FOUND
            )