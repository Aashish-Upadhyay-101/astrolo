from urllib.parse import parse_qs
from django.db import close_old_connections
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from jwt import decode as jwt_decode
from django.conf import settings
from django.contrib.auth import get_user_model
from asgiref.sync import sync_to_async


@sync_to_async
def get_user(id):
    return get_user_model().objects.get(id=id)


class TokenAuthMiddleware: 
    """Custom token auth middleware"""


    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        # close old connection to prevent usage of timed out connections
        close_old_connections() 

        # get the token 
        token = parse_qs(scope["query_string"].decode("utf-8"))["token"][0]

        try: 
            UntypedToken(token) # validate the token
        except (InvalidToken, TokenError) as e:
            print(e)
            return None 
        else:
            decoded_data = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        
            scope["token"] = token
            scope["user"] =  await get_user(decoded_data.get("user_id"))

        return await self.inner(scope, receive, send)