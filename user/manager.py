from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError


class UserManager(BaseUserManager):
    def create_user(self, username, first_name, last_name, email, password, password2=None, **extra_fields):
        if not username: 
            raise ValidationError("User must have a username")
        
        if not first_name:
            raise ValidationError("User must have first name")

        if not last_name:
            raise ValidationError("User must have last name")

        if not password:
            raise ValidationError("User must have a password")
        
        if not email:
            raise ValidationError("User must have an email")
        
        email = self.normalize_email(email)
        user = self.model(
            username=username, 
            first_name=first_name, 
            last_name=last_name, 
            email=email,
            **extra_fields
        )
        
        user.set_password(password)
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        user.save()
        return user


    def create_superuser(self, username, first_name, last_name, email, password, **extra_fields):
        
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValidationError("Superuser must have is_staff=True")
        
        if extra_fields.get("is_active") is not True:
            raise ValidationError("Superuser must have is_acitve=True")

        if extra_fields.get("is_superuser") is not True:
            raise ValidationError("Superuser must have is_superuser=True")

        if not email:
            raise ValidationError("Superuser must have an email")

        if not password:
            raise ValidationError("Superuser must have password")

        email = self.normalize_email(email)
        user = self.create_user(username, first_name, last_name, email, password, **extra_fields)
        user.save(using=self._db)
        return user 