from datetime import datetime

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from common.exceptions import ProfileNotFound
from profiles.models import Profile
from .models import Appointment


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

        # Appointment.objects.create(customer=request.user, astrologer=astrologer_profile.user, start_date=data.get("start_date"), start_time=data.get("start_time"))
        
        return Response({"message": "Appointment has been created"}, status=status.HTTP_200_OK)
        
        
        

