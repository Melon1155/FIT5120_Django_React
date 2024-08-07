from django.contrib.gis.db import models

class Accident(models.Model):
    description = models.TextField()
    severity = models.CharField(max_length=50)
    geom = models.PointField(geography=True, srid=4326)

    def __str__(self):
        return self.description