# Generated by Django 4.2 on 2023-04-09 06:30

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="image",
            name="image",
            field=models.ImageField(
                upload_to="images/0e192742-c02d-46e6-a945-9b78be7fcc1d.png"
            ),
        ),
    ]
