"""
ASGI config for astrolo project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os
from pathlib import Path
import sys 

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from apps.chat.routing import websocket_urlpatterns

ROOT_DIR = Path(__file__).resolve(strict=True).parent.parent
sys.path.append(str(ROOT_DIR / "chat"))


django_asgi_app = get_asgi_application()


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'astrolo.settings')

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": URLRouter(websocket_urlpatterns),
})
