from rest_framework import serializers
from .models import Resume

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model =Resume
        fields=('id','file','extracted_text','uploaded_at','updated_at')
        read_only_fields=('id','extracted_text','uploaded_at','updated_at')

class ResumeUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model =Resume
        fields=['file']

        def validate(self,value):
            if value.name.endswith('.pdf'):
                raise serializers.ValidationError("Only PDF Files are Allowed.")
            if value.size > 5*1024*1024:
                raise serializers.ValidationError("File size must be under 5MB.")
            return value