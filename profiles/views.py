from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated
from .serializers import ProfileSerializer, ProfileUpdateSerailizer
from .models import Profile, Reviews
from common.exceptions import ProfileNotFound, NotYourProfile


User = get_user_model()

class ProfilesAPIView(APIView):
    def get(self, request, format=None):
        profile = Profile.objects.all()
        serializer = ProfileSerializer(profile, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetMyProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        profile = request.user.profile
        serializer = ProfileSerializer(instance=profile)
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
    

class AstrologerReviewAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, profile_id, format=None):
        astrologer_profile = Profile.objects.get(id=profile_id)

        if not astrologer_profile.is_astrologer:
            return Response({"message": "You can't rate a non astrologer"}, status=status.HTTP_400_BAD_REQUEST)

        astrologer_profile_user = astrologer_profile.user 

        # data
        data = request.data

        # check if the user is rating himself or not
        if astrologer_profile_user.email == request.user.email:
            return Response({"message": "You can't rate yourself"}, status=status.HTTP_403_FORBIDDEN)
        
        # check if the user has already rated this astrologer
        already_reviewed = astrologer_profile.astrologer_review.filter(rater=request.user, astrologer=astrologer_profile).exists()
        if already_reviewed:
            return Response({"message": "The astrologer is already being rated by you"}, status=status.HTTP_400_BAD_REQUEST)

        # check if the rating is being selected or not
        elif data.get("rating") == 0 or data.get("rating") > 5:
            return Response({"message": "Please select a rating (1 - 5)"}, status=status.HTTP_400_BAD_REQUEST)
        
        # create Rating
        else:
            Reviews.objects.create(rater=request.user, astrologer=astrologer_profile, rating=data.get("rating"), review_comment=data.get("review_comment"))

        astrologer_all_reviews = astrologer_profile.astrologer_review.all()
        astrologer_profile.num_of_reviews = len(astrologer_all_reviews)

        print(astrologer_all_reviews)

        total_rating = 0
        for review in astrologer_all_reviews:
            total_rating += review.rating
        
        astro_rating = round(total_rating / len(astrologer_all_reviews), 2)
        astrologer_profile.rating = astro_rating 
        astrologer_profile.save()

        return Response({"Review Added"}, status=status.HTTP_201_CREATED)



        

