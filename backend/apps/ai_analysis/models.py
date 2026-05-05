from django.db import models


class AIResult(models.Model):
    application = models.ForeignKey(
        'applications.JobApplication',
        on_delete=models.CASCADE,
        related_name='ai_results'
    )
    match_score = models.IntegerField(default=0)
    strengths = models.JSONField(default=list)
    gaps = models.JSONField(default=list)
    suggestions = models.JSONField(default=list)
    cover_letter = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"AI Result - {self.application}"

    class Meta:
        ordering = ['-created_at']