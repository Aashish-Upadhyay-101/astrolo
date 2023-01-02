from rest_framework import serializers
from profiles.serializers import ProfileSerializer
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    customer = ProfileSerializer()
    astrologer = ProfileSerializer()
    class Meta:
        model = Appointment
        fields = "__all__"


