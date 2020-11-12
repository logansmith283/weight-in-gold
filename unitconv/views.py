from django.shortcuts import render
from django.http import JsonResponse
from .models import Unit

# Create your views here.

def convertUnits(value, unitFrom, unitTo):
    unitFrom = Unit.objects.get(name=unitFrom)
    unitTo = Unit.objects.get(name=unitTo)
    a = unitFrom.getValue()
    b = unitTo.getValue()
    return value*(a/b)


def convert(request):
    #unitList = Unit.objects.order_by('valueInKiloGrams')
    if 'from' in request.GET and 'to' in request.GET and 'value' in request.GET:
        unitFrom = request.GET['from']
        #if unitFrom not in unitList:
        #    return JsonResponse({'error': 'Invalid unit conversion request'})
        unitTo = request.GET['to']
        #if unitTo not in unitList:
        #   return JsonResponse({'error': 'Invalid unit conversion request'})
        val = request.GET['value']
        if val.isdigit():
            val = int(val)
        #else: return JsonResponse({'error': 'Value needs to be an integer value'})
        val = convertUnits(val, unitFrom, unitTo)
        return JsonResponse({'units': unitTo, 'value': val})

    else: return JsonResponse({'error': "Missing one or more parameters"})
