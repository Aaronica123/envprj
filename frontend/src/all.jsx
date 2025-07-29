import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const GetAllLocations = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

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
    <div className="p-8 max-w-2xl mx-auto my-10 shadow-lg rounded-2xl bg-white border border-gray-200 transition-transform hover:translate-y-[-5px] hover:shadow-xl">
      <h2 className="text-4xl font-extrabold text-[#2e7d32] mb-6 text-center tracking-tight">
        All E-Waste Collection Points
      </h2>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
        <button
          type="button" // Important: Changed to "button" to prevent form submission if this were part of a form
          onClick={() => navigate('/navbaradd')} // Navigate to /navbaradd
          className="w-full sm:w-1/2 py-3 px-6 bg-gray-500 text-white font-semibold text-lg rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-600 hover:scale-105 active:scale-100"
        >
          Back to Add Location
        </button>
        <button
          onClick={handleGetAll}
          disabled={isLoading}
          className="w-full sm:w-1/2 py-3 px-6 bg-[#4caf50] text-white font-semibold text-lg rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#388e3c] hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Loading Locations...' : 'Get All Locations'}
        </button>
      </div>


      {error && (
        <div className="text-red-600 text-center mb-4">
          {error}
        </div>
      )}

      <div
        ref={mapRef}
        style={{ height: '400px', width: '100%', marginTop: '20px' }}
        className="rounded-lg border border-gray-300 shadow-inner"
      />

      {allLocations.data.length > 0 && (
        <div className="mt-8 pt-4 border-t border-dashed border-gray-300">
          <h3 className="text-2xl font-semibold text-green-700 mb-3">Available Locations:</h3>
          <p className="text-gray-700 mb-3">Found: <span className="font-bold">{allLocations.data.length}</span> locations.</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 max-h-40 overflow-y-auto pr-2">
            {allLocations.data.map((location, index) => (
              <li key={index} className="text-base">
                <span className="font-medium text-green-700">{location.location}</span>: (Lat: {location.coordinates.coordinates[1].toFixed(4)}, Lng: {location.coordinates.coordinates[0].toFixed(4)})
              </li>
            ))}
          </ul>
        </div>
      )}

      {allLocations.message && !allLocations.data.length && (
        <p className="mt-4 text-gray-500 text-center">{allLocations.message}</p>
      )}
    </div>
  );
};

export default GetAllLocations;