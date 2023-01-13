from django.urls import path
from . import views

urlpatterns = [
    path("", views.AppointmentGetAPIView.as_view(), name="appointment-get"),
    path("update-appointment/<str:username>/", views.AppointmentUpdateAPIView.as_view(), name="appointment-update"),
    path("<str:astrologer_username>/", views.AppointmentCreateAPIView.as_view(), name="appointment_create"),
    path("checkout/create-checkout-session/<str:username>/", views.CreateCheckoutSession.as_view()),
    path("checkout/webhook-test/", views.CheckoutWebHook.as_view()),
]

