from django.urls import path 
from . import views 

# create url patterns here
urlpatterns = [
    path("me/", views.GetMyProfileAPIView.as_view(), name="me"),
    path("all/", views.ProfilesAPIView.as_view(), name="all_profile"),
    path("<str:username>/", views.ProfileGetUpdateAPIView.as_view(), name="update_profile"),
    path("rate/<str:profile_id>/", views.AstrologerReviewAPIView.as_view(), name="astrologer_review")
]
