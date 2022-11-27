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


class ProfileCreateSerailzer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


