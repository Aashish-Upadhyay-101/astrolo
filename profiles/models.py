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
    MALE = "MALE", "M"
    FEMALE = "FEMALE", "F"
    OTHERS = "OTHERS", "Others"


class ProfileType(models.TextChoices):
    ASTROLOGER = "Astrologer", "Astrologer"
    NORMAL_USER = "Normal_User", "Normal user"


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
    profile_type = models.CharField(max_length=30, choices=ProfileType.choices, default=ProfileType.NORMAL_USER, blank=False, null=False)
    rating = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)
    num_of_reviews = models.PositiveIntegerField(default=0, blank=True, null=True)

    def __str__(self):
        return self.user.username

    
class Reviews(TimeStampUUIDModel):
    pass 


@receiver(post_save, sender=AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    
@receiver(post_save, sender=AUTH_USER_MODEL)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

