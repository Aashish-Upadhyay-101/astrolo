from rest_framework import serializers
from user.models import User


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ["id", "username", "first_name", "last_name", "email", "is_active"]