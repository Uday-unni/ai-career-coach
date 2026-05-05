from rest_framework import serializers
from .models import GithubScan

class GithubScanSerializer(serializers.ModelSerializer):
    class Meta:
        model=GithubScan
        fields=(
            'id',
            'user',
            'github_username',
            'repos_data',
            'profile_score',
            'technical_strengths',
            'missing_skills',
            'standout_projects',
            'suggestions',
            'created_at',
            'updated_at'
        )
        read_only_fields=('id','user','created_at','updated_at')