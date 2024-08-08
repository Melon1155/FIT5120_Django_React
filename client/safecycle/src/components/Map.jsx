import mapboxgl from 'mapbox-gl';
import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Scrollbars } from 'react-custom-scrollbars-2';
import * as turf from '@turf/turf';
import polyline from '@mapbox/polyline';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN_ROUTING;

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(144.946457);
    const [lat, setLat] = useState(-37.840935);
    const [zoom, setZoom] = useState(12);
    const [isVisible, setIsVisible] = useState(false);
    const [routeDirections, setRouteDirections] = useState([]);
    const [accidentsData, setAccidentsData] = useState({ type: 'FeatureCollection', features: [] });
    const [accidentsCount, setAccidentsCount] = useState({ low: 0, medium: 0, high: 0 });
    const [isMapInitialized, setIsMapInitialized] = useState(false);

    const handleClose = () => {
        setIsVisible(false);
        ['low', 'medium', 'high'].forEach(severity => {
            if (map.current.getLayer(`accidents-layer-${severity}`)) {
                map.current.setLayoutProperty(`accidents-layer-${severity}`, 'visibility', 'none');
            }
        });
    };

    useEffect(() => {
        fetch('http://localhost:8000/api/accidents/?format=json')
            .then(response => response.json())
            .then(data => {
                setAccidentsData(data);
            })
            .catch(error => console.error('Error fetching accidents data:', error));
    }, []);

    useEffect(() => {
        if (isMapInitialized || accidentsData.features.length === 0) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        const directions = new Directions({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/cycling',
            controls: {
                inputs: true,
                instructions: false,
                profileSwitcher: false
            }
        });

        map.current.addControl(directions, 'top-left');
        const nav = new mapboxgl.NavigationControl({
            visualizePitch: true
        });
        map.current.addControl(nav, 'bottom-right');

        directions.on('route', (e) => {
            setIsVisible(true);
            const route = e.route[0];
            const decodedCoordinates = polyline.decode(route.geometry).map(coord => [coord[1], coord[0]]);
            const routeInstructions = route.legs.map(leg => leg.steps.map(step => step.maneuver.instruction));
            setRouteDirections(routeInstructions.flat());

            ['low', 'medium', 'high'].forEach(severity => {
                if (map.current.getSource(`accidents-${severity}`)) {
                    map.current.removeLayer(`accidents-layer-${severity}`);
                    map.current.removeSource(`accidents-${severity}`);
                }
            });

            const routeLine = turf.lineString(decodedCoordinates);

            const nearbyAccidents = turf.featureCollection(accidentsData.features.filter(feature => {
                const point = turf.point(feature.geometry.coordinates);
                const distance = turf.pointToLineDistance(point, routeLine, { units: 'meters' });
                return distance <= 100;
            }));

            const severityCounts = nearbyAccidents.features.reduce((acc, feature) => {
                const severity = feature.properties.severity;
                acc[severity] = (acc[severity] || 0) + 1;
                return acc;
            }, { low: 0, medium: 0, high: 0 });

            setAccidentsCount(severityCounts);

            const severityColors = {
                low: 'green',
                medium: 'orange',
                high: 'red'
            };

            ['low', 'medium', 'high'].forEach(severity => {
                const severityFeatures = nearbyAccidents.features.filter(feature => feature.properties.severity === severity);

                map.current.addSource(`accidents-${severity}`, {
                    type: 'geojson',
                    data: { type: 'FeatureCollection', features: severityFeatures }
                });

                map.current.addLayer({
                    'id': `accidents-layer-${severity}`,
                    'type': 'circle',
                    'source': `accidents-${severity}`,
                    'paint': {
                        'circle-radius': 4,
                        'circle-stroke-width': 2,
                        'circle-color': severityColors[severity],
                        'circle-stroke-color': 'white'
                    }
                });
            });
        });

        setIsMapInitialized(true);
    }, [accidentsData, isMapInitialized]);

    return (
        <div className="map-container">
            <div ref={mapContainer} className="map" />
            {isVisible && (
                <div className="instructions">
                    <button className="close-button" onClick={handleClose}>
                        <i className="fas fa-times"></i>
                    </button>
                    <Scrollbars>
                        <div className="route-details">
                            <h1 className='font-bold'>Accidents along the route:</h1>
                            <p className='font-bold'>Low Severity: {accidentsCount.low}</p>
                            <p className='font-bold'>Medium Severity: {accidentsCount.medium}</p>
                            <p className='font-bold'>High Severity: {accidentsCount.high}</p>
                            <ol>
                                {routeDirections.map((instruction, index) => (
                                    <li key={index}>{`${index + 1}. ${instruction}`}</li>
                                ))}
                            </ol>
                        </div>
                    </Scrollbars>
                </div>
            )}
            {isVisible && (
                <div className="legend">
                <h3>Legend</h3>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: 'green' }}></span>
                    Low Severity
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: 'orange' }}></span>
                    Medium Severity
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: 'red' }}></span>
                    High Severity
                </div>
            </div>
            )}
        </div>
    );
};

export default Map;
