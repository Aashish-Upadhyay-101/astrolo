from rest_framework import serializers
from .models import Conversation

class ConversationSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    other_user = serializers.SerializerMethodField()

    class Meta:
        model = Conversation   
        fields = ["id", "name", "last_message", "other_user"]

    
    def get_last_message(self):
        pass 

    def get_other_user(self):
        pass 