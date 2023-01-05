from rest_framework import serializers
from common.serializers import UserModelSerializer
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    customer = UserModelSerializer()
    astrologer = UserModelSerializer()
    location = serializers.SerializerMethodField()
    class Meta:
        model = Appointment
        fields = "__all__"

    def get_location(self, obj):
        return f"{obj.astrologer.profile.city}, {obj.astrologer.profile.country}"

