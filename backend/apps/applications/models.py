from django.db import models
from django.conf import settings


class JobApplication(models.Model):
    STATUS_CHOICES = (
        ('saved', 'Saved'),
        ('applied', 'Applied'),
        ('interview', 'Interview'),
        ('offer', 'Offer'),
        ('rejected', 'Rejected')
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='applications')
    company_name = models.CharField(max_length=100, null=True, blank=True)
    job_title = models.CharField(max_length=100)
    job_url = models.URLField(null=True, blank=True)
    job_description = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='saved')
    location = models.CharField(max_length=100, null=True, blank=True)
    notes = models.TextField(max_length=500, null=True, blank=True)
    applied_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.company_name} - {self.job_title}"

    class Meta:
        ordering = ['-created_at']  # newest application first