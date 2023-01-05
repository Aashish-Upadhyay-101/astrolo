from django.contrib import admin
from django.contrib.admin import ModelAdmin
from .models import Profile, Reviews


class ProfileAdmin(ModelAdmin):
    list_display = ["id", "pkid", "gender", "user", "country"]
    list_display_links = ["id", "pkid", "user"]
    list_filter = ["gender", "country", "city"]

admin.site.register(Profile, ProfileAdmin)
admin.site.register(Reviews)

