from io import BytesIO, StringIO
import os
import PIL
from django.db import models
import uuid
import urllib.request
import ssl
from django.core.files import File
import requests


ssl._create_default_https_context = ssl._create_unverified_context

# Create your models here.
class Note(models.Model):
    note = models.CharField(max_length=800)
    date = models.DateField()

    def __str__(self):
        return self.note

class Image(models.Model):
    image = models.ImageField()
    note = models.ForeignKey(Note, on_delete=models.CASCADE)

    def __str__(self):
        return self.image
    
def save_images(images, note):
    for image in images:
        r = requests.get(image)
        image = PIL.Image.open(BytesIO(r.content))
        path_to_file = str(uuid.uuid4()) + '.png'
        image.save(path_to_file)
        new_image = Image.objects.create(image=path_to_file, note=note)
        new_image.save()