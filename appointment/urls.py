from django.urls import path
from . import views

urlpatterns = [
    path("<str:astrologer_username>/", views.AppointmentCreateAPIView.as_view(), name="appointment_create"),
    path("checkout/create-checkout-session/<str:username>/", views.CreateCheckoutSession.as_view()),
    path("checkout/webhook-test/", views.CheckoutWebHook.as_view()),
]

