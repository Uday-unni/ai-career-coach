from rest_framework import serializers
from .models import AIResult

class AIResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIResult
        fields = [
            'id',
            'application',
            'match_score',
            'strengths',
            'gaps',
            'suggestions',
            'cover_letter',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ('id','created_at','updated_at')