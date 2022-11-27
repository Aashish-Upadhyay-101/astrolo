from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response 
from .serializers import ProfileSerializer
from .models import Profile

class ProfilesAPIView(APIView):
    def get(self, request, format=None):
        profile = Profile.objects.all()
        serializer = ProfileSerializer(profile, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
