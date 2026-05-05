from django.urls import path
from.views import GithubScanView,GithubScanResultView

urlpatterns = [
    path('',GithubScanView.as_view(),name='GithubScan'),
    path('result/<int:id>/',GithubScanResultView.as_view(),name='GithubScanResult'),
]