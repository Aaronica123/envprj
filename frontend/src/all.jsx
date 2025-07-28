import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Location Map</h1>
      
      <button
        onClick={handleGetAll}
        disabled={isLoading}
        className={`px-4 py-2 rounded text-white ${
          isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        } mb-4`}
      >
        {isLoading ? 'Loading...' : 'Get All Locations'}
      </button>

      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      <div 
        ref={mapRef}
        className="w-full h-[500px] mb-4"
      />

      {allLocations.data.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Locations List</h2>
          <ul className="list-disc pl-5">
            {allLocations.data.map((location, index) => (
              <li key={index} className="mb-2">
                <span className="font-medium">{location.location}</span>
                <span className="ml-2">
                  (Lat: {location.coordinates.coordinates[1].toFixed(4)}, 
                  Lng: {location.coordinates.coordinates[0].toFixed(4)})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {allLocations.message && (
        <p className="mt-4 text-gray-600">{allLocations.message}</p>
      )}
    </div>
  );
};

export default GetAllLocations;