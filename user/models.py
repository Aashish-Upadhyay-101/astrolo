import random 
import string 
import uuid
import datetime 

from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone

from .manager import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=120, unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    objects = UserManager()


    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    
    def __str__(self):
        return self.username 

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"


class AccountVerification(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="verification_code")
    verification_code = models.CharField(max_length=6, blank=False, null=False)
    created_at = models.DateTimeField(default=timezone.now, blank=True, null=True)
    

    @property
    def delete_code_after_five_minutes(self):
        time = self.created_at + datetime.timedelta(minutes=5)
        if datetime.datetime.now() > time:
            self.delete()
            return True
        return False

    def save(self, *args, **kwargs):
        self.verification_code = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
        super(AccountVerification, self).save(*args, **kwargs)

    def __str__(self):
        return self.verification_code


@receiver(post_save, sender=User)
def create_activation_code(sender, instance, created, **kwargs):
    if created:
        AccountVerification.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_activation_code(sender, instance, **kwargs):
    instance.verification_code.save()


