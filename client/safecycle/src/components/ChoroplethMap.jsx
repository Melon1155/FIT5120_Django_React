import mapboxgl from 'mapbox-gl';
import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicHJlZXRoaWRvbnRodSIsImEiOiJjbHU3cHh1bWMwOGFyMmxwbnRpaGEwbW1hIn0.s9nQ_ZEtcYhaY9SRDS-0Jw';

const ChoroplethMap = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(144.946457);
    const [lat, setLat] = useState(-37.840935);
    const [zoom, setZoom] = useState(10);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/preethidonthu/clzhabtb800l901r1898yax6k',
            center: [lng, lat],
            zoom: zoom
        });
    })

    return (
        <div className="map-container">
            <div ref={mapContainer} className="map" />
        </div>
    );
}

export default ChoroplethMap;
