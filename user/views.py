from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import smart_str
from django.core.mail import send_mail
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

from common.serializers import UserModelSerializer
from common.exceptions import UserNotFound
from .serializers import UserLoginSerializer, UserRegisterSerializer


User = get_user_model()

# generate token manually 
def get_token_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class UserRegistrationView(APIView):
    def post(self, request, format=None): 
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_token_for_user(user)
            response = Response()
            response.data = {"message": "Signup successfull", "access": token.get("access"), "refresh": token.get("refresh")}
            response.status_code = 201
            return response
        return Response({"message", serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get("email")
        password = serializer.data.get("password")
        user = authenticate(email=email, password=password)
        if user is not None:
            token = get_token_for_user(user)
            response = Response()
            response.data = {"message": "login successfull", "access": token.get("access"), "refresh": token.get("refresh")}
            response.status_code = 200
            return response 
        else:
            return Response({"error": "Invalid username or password"}, status=status.HTTP_404_NOT_FOUND)
            

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserModelSerializer(instance=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
        

class ActivateAccount(APIView):
    def get(self, request, username, format=None):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise UserNotFound
        
        user_id = str(user.id).encode()
        uid = urlsafe_base64_encode(user_id)
        token = PasswordResetTokenGenerator().make_token(user)
        account_activation_url = f"http://127.0.0.1:8000/api/auth/activate-account/{uid}/{token}/"

        # email
        subject = "Account activation for Astrolo"
        email_body = f'Hello {user.get_full_name}, \nclick the button below to activate your account.\n  \
         <a style="padding:8px 12px; color: #fff; background-color: green; text-decoration: none; " href={account_activation_url}>Activate</a>'               
        to = user.email 
        email_from = settings.EMAIL_HOST_USER

        try:
            print("sending")
            send_mail(subject, email_body, email_from, [to])
            return Response({"message": "Email sent successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)

        return Response({"message": "There was problem sending email please try again."})


class VerifyAndActivateAccount(APIView):
    def get(self, request, uid, token, format=None):
        user_id = smart_str(urlsafe_base64_decode(uid))
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise UserNotFound
        
        if not PasswordResetTokenGenerator().check_token(user,token):
            return Response({"message": "Token is invalid, please request another one"}, status=status.HTTP_401_UNAUTHORIZED)

        user.is_active = True
        user.save()
        return Response({"message": "Credentials Valid", "uid": uid, "token": token}, status=status.HTTP_200_OK)


