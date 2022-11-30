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

    @property
    def is_astrologer(self):
        return self.profile_type == "Astrologer"

    def __str__(self):
        return self.user.username



class Reviews(TimeStampUUIDModel):
    REVIEW_RANGE = [
        (1, "Very Bad"),
        (2, "Fair"),
        (3, "Good"),
        (4, "Very Good"),
        (5, "Excellent"),
    ]

    rater = models.ForeignKey(AUTH_USER_MODEL, related_name="reviews", on_delete=models.CASCADE)
    astrologer = models.ForeignKey(Profile, related_name="astrologer_review", on_delete=models.SET_NULL, null=True)
    rating = models.IntegerField(choices=REVIEW_RANGE, default=0)
    review_comment = models.TextField(max_length=300, blank=True, null=True)

    class Meta:
        unique_together = ["rater", "astrologer"]
        verbose_name = "Review"
        verbose_name_plural = "Reviews"

    def __str__(self):
        return f"{self.astrologer} rating is -> {self.rating}"


@receiver(post_save, sender=AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    
@receiver(post_save, sender=AUTH_USER_MODEL)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

