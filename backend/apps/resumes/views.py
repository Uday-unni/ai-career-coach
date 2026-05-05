from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Resume
from .serializer import ResumeSerializer,ResumeUploadSerializer
from .utils import extract_text_fom_pdf
from rest_framework.permissions import IsAuthenticated
import os

class ResumeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        try:
            resume=Resume.objects.get(user=request.user)
            serializer=ResumeSerializer(resume)
            return Response(serializer.data)
        except:
            return Response({"message": "Resume not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self,request):
        serializer=ResumeUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            old_resume=Resume.objects.get(user=request.user)
            if old_resume.file:
                if os.path.isfile(old_resume.file.path):
                    os.remove(old_resume.file.path)
            old_resume.delete()
        except Resume.DoesNotExist:
            pass

        resume=Resume.objects.create(user=request.user,file=serializer.validated_data['file'])

        try:
            extracted=extract_text_fom_pdf(resume.file.path)
            resume.extracted_text=extracted
            resume.save()

        except ValueError as e:
            return Response({'error':e},status=status.HTTP_400_BAD_REQUEST)
        return Response(ResumeSerializer(resume).data,status=status.HTTP_201_CREATED)

    def delete(self,request):
        try:
            resume=Resume.objects.get(user=request.user)
            if os.path.isfile(resume.file.path):
                os.remove(resume.file.path)
            resume.delete()
            return Response({"message": "Resume deleted"}, status=status.HTTP_204_NO_CONTENT)
        except  Resume.DoesNotExist:
            return Response({"message": "Resume not found"}, status=status.HTTP_404_NOT_FOUND)


