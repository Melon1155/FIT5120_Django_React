from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Accident
from .serializer import AccidentGeoJSONSerializer

@api_view(['GET'])
def get_accidents(request):
    accidents = Accident.objects.all()
    serialized_data = AccidentGeoJSONSerializer({"type": "FeatureCollection", "features": accidents}).data
    return Response(serialized_data, status=status.HTTP_200_OK)
