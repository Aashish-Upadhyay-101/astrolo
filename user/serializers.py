# from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type:": "password"}, write_only=True)

    class Meta:
        model = User 
        fields = ["username", "first_name", "last_name", "email", "password", "password2"]
        extra_kwargs = {
            "password": {"write_only": True}
        }


    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")

        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match.")
        
        return attrs 

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        # user.is_active = True 
        # user.save()
        return user 


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=120)

    class Meta:
        model = User 
        fields = ["email", "password"]
