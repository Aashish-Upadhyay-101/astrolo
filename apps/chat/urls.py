from django.urls import path, include
from .views import ConversationViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"conversation", ConversationViewSet, basename="conversation")


urlpatterns = [
    path("", include(router.urls)),
]



