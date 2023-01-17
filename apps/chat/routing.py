from django.urls import path

from . import consumers


websocket_urlpatterns = [
    path("", consumers.ChatConsumer.as_asgi()),
    path("<str:conversation_name>/", consumers.ChatConsumer.as_asgi()),
]

 