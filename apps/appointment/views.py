from datetime import datetime
import json
import stripe

from django.conf import settings
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from apps.common.exceptions import ProfileNotFound
from apps.profiles.models import Profile
from .models import Appointment
from .serializers import AppointmentSerializer


stripe.api_key = settings.STRIPE_SECRET_KEY
webhook_endpoint_secret = settings.STRIPE_WEBHOOK_KEY


class AppointmentGetAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        appointments = Appointment.objects.filter(customer=request.user)
        serializer = AppointmentSerializer(instance=appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)     


class AppointmentCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, astrologer_username, *args, **kwargs):
        try:
            astrologer_profile = Profile.objects.get(user__username=astrologer_username)
        except Profile.DoesNotExist:
            raise ProfileNotFound
        
        if request.user.email == astrologer_profile.user.email:
            return Response({"message": "You can't take appointment with yourself."}, status=status.HTTP_400_BAD_REQUEST)

        if astrologer_profile.profile_type != "Astrologer":
            return Response({"message": "You can't take appointment with a non astrologer"}, status=status.HTTP_400_BAD_REQUEST)

        if Appointment.objects.filter(customer=request.user, astrologer=astrologer_profile.user).exists():
            return Response({"message": "You can't book appointment with the same person twice."}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data

        # changing date/time string to python date/time object
        date = data.get('start_date')
        date_format = "%Y-%m-%d"
        date_obj = datetime.strptime(date, date_format)
        data['start_date'] = date_obj.strftime(date_format)

        time = data.get('start_time')
        time_format = "%H:%M:%S"
        time_obj = datetime.strptime(time, time_format)
        data['start_time'] = time_obj.strftime(time_format)

        appointment, created = Appointment.objects.get_or_create(customer=request.user, astrologer=astrologer_profile.user, start_date=data.get("start_date"), start_time=data.get("start_time"))
        if not created:
            return Response({"message": "You can't schedule an appointment twice with a same astrologer"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"message": "Appointment has been created"}, status=status.HTTP_200_OK)
        
        
class CreateCheckoutSession(APIView):
    def post(self, request, username, *args, **kwargs):
        astrologer_profile = Profile.objects.get(user__username=username)
        try: 
            checkout_session = stripe.checkout.Session.create(
                line_items = [{
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            "name": astrologer_profile.user.username,
                            "description": "Book an appointment with this astrologer and see your furtunes",
                        },
                        "unit_amount": astrologer_profile.price * 100,
                    },
                    "quantity": 1,
                }],
                metadata = {
                    
                },
                mode = "payment",
                success_url = "http://localhost:3000/astrologer/checkout/success",
                cancel_url = "http://localhost:3000/astrologer/checkout/cancel",
            )
            return Response(checkout_session.url)
        except Exception as e:
            print("error occor")
            print(e)
            return Response("Something went wrong")


class CheckoutWebHook(APIView):
    def post(self, request, *args, **kwargs):
        event = None
        payload = request.data

        try: 
            event = json.loads(payload)
        except Exception as e:
            print('⚠️  Webhook error while parsing basic request.' + str(e))
            return Response(success=False)

        if webhook_endpoint_secret:
            sig_header = request.headers.get('stripe-signature')
            try: 
                event = stripe.Webhook.construct_event(
                    payload, sig_header, webhook_endpoint_secret
                )
            except stripe.error.SignatureVerificationError as e:
                print('⚠️  Webhook signature verification failed.' + str(e))
                return Response(success=False)

        # handling event
        if event and event['type'] == "payment_intent.succeeded":
            payment_intent = event['data']['object']
            _handle_successful_payment(payment_intent)
        else:
            print('Unhandled event type {}'.format(event['type']))

        return Response(success=True)


        
def _handle_successful_payment(payment_intent):
    ...




