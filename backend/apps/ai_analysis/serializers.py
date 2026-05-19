from rest_framework import serializers
from .models import AIResult

class AIResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIResult
        fields = [
            'id',
            'application',
            'match_score',
            'ats_score',
            'ats_issues',
            'ats_keywords_found',
            'ats_keywords_missing',
            'strengths',
            'gaps',
            'suggestions',
            'cover_letter',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ('id','created_at','updated_at')