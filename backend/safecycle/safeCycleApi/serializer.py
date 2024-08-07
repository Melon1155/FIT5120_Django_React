from rest_framework import serializers
from .models import Accident

class AccidentGeoJSONSerializer(serializers.Serializer):
    type = serializers.CharField(default='FeatureCollection')
    features = serializers.SerializerMethodField()

    def get_features(self, obj):
        return [{
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [accident.geom.x, accident.geom.y]
            },
            "properties": {
                "id": accident.id,
                "description": accident.description,
                "severity": accident.severity
            }
        } for accident in obj['features']]

    class Meta:
        fields = ['type', 'features']
