from django.shortcuts import render
from django.http import JsonResponse
from .models import Unit

# Create your views here.

def convertUnits(value, a, b):
    value = float(value)
    return value*(a/b)


def convert(request):
    if 'from' in request.GET and 'to' in request.GET and 'value' in request.GET:
        try:
            unitFrom = request.GET['from']
            unitFrom = Unit.objects.get(name=unitFrom).getValue()
            unitTo = request.GET['to']
            unitTo = Unit.objects.get(name=unitTo).getValue()
        except:
            return JsonResponse({'error': 'The requested unit is not supported'})
        val = request.GET['value']
        try:
            val = float(val)
        except:
            return JsonResponse({'error': 'Value needs to be a numeric value'})
        val = convertUnits(val, unitFrom, unitTo)
        return JsonResponse({'units': f"{request.GET['to']}", 'value': val})

    else: return JsonResponse({'error': "Missing one or more parameters"})
