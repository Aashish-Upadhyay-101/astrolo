from django.urls import path
from . import views

urlpatterns = [
    path("<str:astrologer_username>/", views.AppointmentCreateAPIView.as_view(), name="appointment_create"),
]


