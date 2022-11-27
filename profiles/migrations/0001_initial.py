# Generated by Django 4.1.3 on 2022-11-26 08:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_countries.fields
import phonenumber_field.modelfields
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('pkid', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'FEMALE'), ('O', 'OTHERS')], default='O', max_length=10)),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, region=None)),
                ('country', django_countries.fields.CountryField(max_length=2)),
                ('zip_code', models.CharField(blank=True, max_length=10, null=True)),
                ('city', models.CharField(max_length=50)),
                ('about_me', models.TextField(default='Say something about yourself', max_length=255)),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='profile_pictures')),
                ('profile_intro_video', models.FileField(blank=True, null=True, upload_to='profile_videos')),
                ('profile_type', models.CharField(choices=[('Astrologer', 'Astrologer'), ('Normal_user', 'Normal_user')], default='Normal_user', max_length=30)),
                ('rating', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True)),
                ('num_of_reviews', models.PositiveIntegerField(blank=True, default=0, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
