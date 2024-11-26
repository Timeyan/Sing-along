# Generated by Django 5.1.3 on 2024-11-25 09:25

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Room",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "code",
                    models.CharField(
                        default=api.models.generate_unique_code,
                        max_length=12,
                        unique=True,
                    ),
                ),
                ("host", models.CharField(max_length=50, unique=True)),
                ("guest_can_pause", models.BooleanField(default=False)),
                ("votes_to_skip", models.IntegerField(default=1)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
