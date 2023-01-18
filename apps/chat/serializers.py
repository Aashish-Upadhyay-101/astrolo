from rest_framework import serializers
from .models import Conversation, Message
from apps.profiles.models import Profile
from apps.profiles.serializers import ProfileSerializer


class MessageSerializer(serializers.ModelSerializer):
    from_user = serializers.SerializerMethodField()
    to_user = serializers.SerializerMethodField()
    conversation = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ["id", "from_user", "to_user", "conversation", "content", "read", "created_at"]

    
    def get_from_user(self, obj):
        return ProfileSerializer(instance=obj.from_user).data

    def get_to_user(self, obj):
        return ProfileSerializer(instance=obj.to_user).data

    def get_conversation(self, obj):
        return obj.conversation.id 


class ConversationSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    other_user = serializers.SerializerMethodField()

    class Meta:
        model = Conversation   
        fields = ["id", "name", "last_message", "other_user"]

    
    def get_last_message(self, obj):
        messages = obj.messages.all().order_by("-created_at")
        if not messages.exists():
            return None 
        
        last_message = messages[0]
        return MessageSerializer(instance=last_message).data

    def get_other_user(self, obj):
        usernames = obj.name.split("__")

        for username in usernames:
            if username != self.context['user'].username:
                other_user = Profile.objects.get(user__username=username)
                return ProfileSerializer(instance=other_user).data
