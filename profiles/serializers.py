from rest_framework import serializers
from .models import Profile
from common.serializers import UserModelSerializer
from django_countries.serializer_fields import CountryField
from .models import Gender

class ProfileSerializer(serializers.ModelSerializer):
    user = UserModelSerializer()
    country = CountryField(name_only=True)
    gender = serializers.ChoiceField(choices=Gender.choices)

    class Meta:
        model = Profile 
        exclude = ["pkid"]


class ProfileUpdateSerailizer(serializers.ModelSerializer):
    country = CountryField(name_only=True)

    class Meta:
        model = Profile
        fields = ["phone_number", "country", "gender", "zip_code", "city", "about_me", "profile_picture", "profile_intro_video", "profile_type"]


    