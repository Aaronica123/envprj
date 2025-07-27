import React, { useEffect, useRef, useState } from 'react';
// No local CSS import needed now: import './styles.css'; 

const GetAllLocations = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [allLocations, setAllLocations] = useState({ message: '', data: [] });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([0, 0], 2);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(mapInstanceRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleGetAll = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      setAllLocations({
        message: result.message,
        data: result.data || []
      });

      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      if (result.data && result.data.length > 0) {
        const bounds = [];
        result.data.forEach(location => {
          const lat = location.coordinates.coordinates[1];
          const lng = location.coordinates.coordinates[0];
          const marker = L.marker([lat, lng])
            .addTo(mapInstanceRef.current)
            .bindPopup(`Location: ${location.location}`);
          markersRef.current.push(marker);
          bounds.push([lat, lng]);
        });

        if (bounds.length > 0) {
          mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
      }

      setError('');
    } catch (error) {
      console.error("Failed to fetch all locations:", error);
      setError('Failed to fetch all locations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

};

export default GetAllLocations;