from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated
from .serializers import ProfileSerializer, ProfileUpdateSerailizer
from .models import Profile
from .exceptions import ProfileNotFound, NotYourProfile

class ProfilesAPIView(APIView):
    def get(self, request, format=None):
        profile = Profile.objects.all()
        serializer = ProfileSerializer(profile, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# patch request -> "MALE",  phone_number -> "<country_code><phone_number>"
class ProfileGetUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, username, format=None):
        try: 
            Profile.objects.get(user__username=username)
        except Profile.DoesNotExist:
            raise ProfileNotFound
        
        if request.user.username != username:
            raise NotYourProfile
        
        serializer = ProfileSerializer(instance=request.user.profile)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def patch(self, request, username, format=None):
        try:
            Profile.objects.get(user__username=username)
        except Profile.DoesNotExist:
            raise ProfileNotFound
    
        if request.user.username != username:
            raise NotYourProfile

        serializer = ProfileUpdateSerailizer(instance=request.user.profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
    

