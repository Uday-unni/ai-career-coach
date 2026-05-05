from django.urls import path
from .views import JobApplicationListView,JobApplicationDetailView

urlpatterns = [
    path('',JobApplicationListView.as_view(),name='JobApplicationListView'),
    path('<int:id>/',JobApplicationDetailView.as_view(),name='JobApplicationDetailView'),

]