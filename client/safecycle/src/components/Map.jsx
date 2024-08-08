import mapboxgl from 'mapbox-gl';
import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Scrollbars } from 'react-custom-scrollbars-2';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN_ROUTING;

const Map = () => {
    
    /* const [accidents, setAccidents] = useState([]);
    
    useEffect(() => {
        fetchAccidents();
    }, [])
    
    const fetchAccidents = async () =>  {
        try{
            const response = await fetch("/API URL HERE");
            const data = await response.json();
            setAccidents(data);
            console.log(data);
        }
        catch (err) {
            console.log(err)
        }
    }

    const addAccidentsToMap = (data) => {
        if (!map.current.getSource('accidents')) {
            map.current.addSource('accidents', {
                type: 'geojson',
                data: data
            });

            map.current.addLayer({
                id: 'accidents',
                type: 'circle',
                source: 'accidents',
                paint: {
                    'circle-radius': 6,
                    'circle-color': '#FF0000'
                }
            });
        } else {
            map.current.getSource('accidents').setData(data);
        }
    };

    */

    const [isVisible, setIsVisible] = useState(false);
    const [routeDirections, setRouteDirections] = useState([]);

    const handleClose = () => {
        setIsVisible(false);
        if (map.current.getLayer('filtered-accidents')) {
            map.current.setLayoutProperty('filtered-accidents', 'visibility', 'none');
        }
    };

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(144.946457);
    const [lat, setLat] = useState(-37.840935);
    const [zoom, setZoom] = useState(12);

    useEffect(() => {
        if (map.current) return;
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
        map.current.addControl(nav, 'bottom-right')

        directions.on('route', (e) => {
            setIsVisible(true);
            const route = e.route[0];
            const routeInstructions = route.legs.map(leg => leg.steps.map(step => step.maneuver.instruction));
            setRouteDirections(routeInstructions.flat());
        });

        map.current.on('load', () => {
            if (accidents.length > 0) {
                addAccidentsToMap(accidents);
            }
        });
    }, []);

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
                            <ol>
                                {routeDirections.map((instruction, index) => (
                                    <li key={index}>{`${index + 1}. ${instruction}`}</li>
                                ))}
                            </ol>
                        </div>
                    </Scrollbars>
                </div>
            )}
        </div>
    );
};

export default Map;
