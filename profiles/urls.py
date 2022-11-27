from django.urls import path 
from . import views 

# create url patterns here
urlpatterns = [
    path("all/", views.ProfilesAPIView.as_view(), name="all_profile"),
]
