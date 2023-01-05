from django.db import models
from apps.user.models import User
from apps.common.models import TimeStampUUIDModel


class AppointmentStatus(models.TextChoices):
    pending = "pending", "pending"
    approved = "approved", "approved"
    cancelled = "cancelled", "cancelled"


class Appointment(TimeStampUUIDModel):
    customer = models.ForeignKey(User, related_name="customer_appointment", on_delete=models.CASCADE)
    astrologer = models.ForeignKey(User, related_name="astrologer_appointment", on_delete=models.CASCADE)
    start_date = models.DateField(auto_created=True)
    start_time = models.TimeField(auto_created=True)
    status = models.CharField(choices=AppointmentStatus.choices, default=AppointmentStatus.pending, max_length=15)
    payment = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.customer.username}-{self.astrologer.username}"
    
    


