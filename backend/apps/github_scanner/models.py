from django.db import models
from django.conf import settings


class GithubScan(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='github_scans'
    )
    github_username = models.CharField(max_length=100)
    repos_data = models.JSONField(default=list)
    profile_score = models.IntegerField(default=0)
    technical_strengths = models.JSONField(default=list)
    missing_skills = models.JSONField(default=list)
    standout_projects = models.JSONField(default=list)
    suggestions = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.github_username}"

    class Meta:
        ordering = ['-created_at']