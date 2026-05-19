from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import JobApplication
from .serializers import JobApplicationSerializer


class JobApplicationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get only current user's applications
        jobs = JobApplication.objects.filter(user=request.user)
        serializer = JobApplicationSerializer(jobs, many=True)
        return Response(serializer.data)

    def post(self, request):
        company_name = request.data.get("company_name", "").strip()
        job_title = request.data.get("job_title", "").strip()
        job_url = request.data.get("job_url", "").strip()

        existing = JobApplication.objects.filter(
            user=request.user,
            company_name__iexact=company_name,
            job_title__iexact=job_title,
            job_url=job_url,
        ).first()

        if existing:
            return Response(
                {"error": "This job application already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = JobApplicationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JobApplicationDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, id, user):
        try:
            return JobApplication.objects.get(id=id, user=user)
        except JobApplication.DoesNotExist:
            return None

    def get(self, request, id):
        job = self.get_object(id, request.user)
        if not job:
            return Response(
                {"error": "Job application not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = JobApplicationSerializer(job)
        return Response(serializer.data)

    def patch(self, request, id):
        job = self.get_object(id, request.user)
        if not job:
            return Response(
                {"error": "Job application not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = JobApplicationSerializer(
            job,
            data=request.data,
            partial=True  # only update fields that are sent
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        job = self.get_object(id, request.user)
        if not job:
            return Response(
                {"error": "Job application not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        job.delete()
        return Response(
            {"message": "Job application deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )