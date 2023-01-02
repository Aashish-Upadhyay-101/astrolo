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
        Appointment.objects.create(customer=request.user, astrologer=astrologer_profile.user, start_at=data.get("start_at"))
        
        return Response({"message": "Appointment has been created"}, status=status.HTTP_200_OK)
        
        
        

