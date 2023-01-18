from django.db import models
from django.contrib.auth import get_user_model
from apps.common.models import TimeStampUUIDModel
from apps.profiles.models import Profile

User = get_user_model()

class Conversation(TimeStampUUIDModel):
    name = models.CharField(max_length=128)
    online = models.ManyToManyField(to=User, blank=True)

    def get_online_count(self):
        return self.online.count()

    def join(self, user):
        self.online.add(user)
        self.save()

    def leave(self, user):
        self.online.remove()
        self.save()

    def __str__(self):
        return f"{self.name} ({self.get_online_count()})"


class Message(TimeStampUUIDModel):
    conversation = models.ForeignKey(Conversation, related_name="messages", on_delete=models.CASCADE)
    from_user = models.ForeignKey(Profile, related_name="message_from_me", on_delete=models.CASCADE)
    to_user = models.ForeignKey(Profile, related_name="message_to_me", on_delete=models.CASCADE)
    content = models.CharField(max_length=512)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"From {self.from_user.user.username} to {self.to_user.user.username}: {self.content}[{self.created_at}]"