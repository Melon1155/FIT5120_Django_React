import mapboxgl from 'mapbox-gl';
import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN_CHOROPLETH;

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
