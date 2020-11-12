from django.db import models

# Create your models here.

class Unit(models.Model):
    name = models.CharField(max_length=50)
    valueInKiloGrams = models.FloatField()
    
    def getValue(self):
        return self.valueInKiloGrams
