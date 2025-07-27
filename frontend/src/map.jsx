import React, { useEffect, useRef } from 'react';

const MapDisplay = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Initialize Leaflet map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([0, 0], 2);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(mapInstanceRef.current);
    }

    // Cleanup on component unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <h2>Map View</h2>
      <div
        id="map"
        ref={mapRef}
        style={{ height: '400px', width: '100%', marginTop: '20px' }}
      ></div>
    </div>
  );
};

export default MapDisplay;