from django.urls import path 
from . import views


urlpatterns = [
    path("register/", views.UserRegistrationView.as_view(), name="register_user"),
    path("login/", views.UserLoginView.as_view(), name="login_user"),
    path("user/", views.UserProfileView.as_view(), name="user"),
]
