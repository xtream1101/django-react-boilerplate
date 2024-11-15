import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(blank=False, max_length=254, verbose_name="email address")

    USERNAME_FIELD = "username"  # e.g: "username", "email"
    EMAIL_FIELD = "email"  # e.g: "email", "primary_email"

    @property
    def full_name(self) -> str:
        return self.get_full_name()

    @property
    def display_name(self) -> str:
        email_first_part = self.email.split("@")[0]
        return self.full_name or email_first_part

    @property
    def initials(self) -> str:
        return "".join(list(map(lambda name: name[0].upper(), self.display_name.split(" "))))

    def __str__(self):
        return f"{self.display_name} ({self.email})"

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)
        self.username = self.email

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
