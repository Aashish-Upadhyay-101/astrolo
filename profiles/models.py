from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from astrolo.settings import AUTH_USER_MODEL
from phonenumber_field.modelfields import PhoneNumberField
from django_countries.fields import CountryField
from common.models import TimeStampUUIDModel


User = get_user_model()


class Gender(models.TextChoices):
    MALE = "M", "Male"
    FEMALE = "F", "FEMALE"
    OTHERS = "O", "OTHERS"


class ProfileType(models.TextChoices):
    ASTROLOGER = "Astrologer", "Astrologer"
    NORMAL_USER = "Normal_user", "Normal_user"


class Profile(TimeStampUUIDModel):
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    gender = models.CharField(choices=Gender.choices, default=Gender.OTHERS, max_length=10)
    phone_number = PhoneNumberField(blank=True)
    country = CountryField(blank=False, null=False)
    zip_code = models.CharField(max_length=10, blank=True, null=True)
    city = models.CharField(max_length=50, blank=False, null=False)
    about_me = models.TextField(max_length=255, default="Say something about yourself", blank=False, null=False)
    profile_picture = models.ImageField(upload_to="profile_pictures", blank=True, null=True)
    profile_intro_video = models.FileField(upload_to="profile_videos", blank=True, null=True)
    profile_type = models.CharField(choices=ProfileType.choices, default=ProfileType.NORMAL_USER, blank=False, null=False)
    rating = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)
    num_of_reviews = models.PositiveIntegerField(default=0, blank=True, null=True)


# @receiver(post_save, )