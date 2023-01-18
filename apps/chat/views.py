from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.generics import get_object_or_404
from .models import Conversation
from .serializers import ConversationSerializer


class ConversationViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    queryset = Conversation.objects.none()
    serializer_class = ConversationSerializer
    lookup_field = "name"

    def get_queryset(self):
        queryset = Conversation.objects.filter(name__contains=self.request.user.username)
        return queryset

    def get_serializer_context(self):
        return {"request": self.request, "user": self.request.user}
