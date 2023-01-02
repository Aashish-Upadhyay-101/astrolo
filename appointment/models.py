from django.db import models
from profiles.models import Profile
from common.models import TimeStampUUIDModel


class AppointmentStatus(models.TextChoices):
    pending = "pending", "pending"
    approved = "approved", "approved"
    cancelled = "cancelled", "cancelled"


class Appointment(TimeStampUUIDModel):
    customer = models.ForeignKey(Profile, related_name="customer_appointment", on_delete=models.CASCADE)
    astrologer = models.ForeignKey(Profile, related_name="astrologer_appointment", on_delete=models.CASCADE)
    start_at = models.DateTimeField()
    end_at = models.DateTimeField()
    status = models.CharField(choices=AppointmentStatus.choices, default=AppointmentStatus.pending, max_length=15)
    payment = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.customer.user.username}-{self.astrologer.user.username}"
    
    


