from django.urls import path
from .views import AnalyzeResumeView, GenerateCoverLetterView, AIResultView


urlpatterns = [
    path('analyze/', AnalyzeResumeView.as_view(), name='analyze'),
    path('cover-letter/', GenerateCoverLetterView.as_view(), name='cover-letter'),
    path('results/<int:id>/', AIResultView.as_view(), name='results'),
]