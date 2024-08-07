from django.urls import path
from .views import get_accidents

urlpatterns = [
    path('accidents/', get_accidents, name='get_accidents')
]