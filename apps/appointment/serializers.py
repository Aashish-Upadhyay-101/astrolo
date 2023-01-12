from rest_framework import serializers
from apps.common.serializers import UserModelSerializer
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    customer = UserModelSerializer()
    astrologer = UserModelSerializer()
    location = serializers.SerializerMethodField()
    class Meta:
        model = Appointment
        fields = "__all__"

    def get_location(self, obj):
        if self.context['request'].user.profile.profile_type == "Astrologer":
            return f"{obj.customer.profile.city}, {obj.customer.profile.country}"
        return f"{obj.astrologer.profile.city}, {obj.astrologer.profile.country}"


