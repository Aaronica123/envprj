import React, { useEffect, useRef, useState } from 'react';

// Make sure Leaflet is included via index.html or a script tag, e.g.:
// <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
// <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
// Also ensure Tailwind CSS is available, e.g., via CDN in index.html:
// <script src="https://cdn.tailwindcss.com"></script>

function App() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null); // Marker for current location
  const [error, setError] = useState('');

  // Function to get current location using Geolocation API
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve([latitude, longitude]);
          },
          (error) => {
            reject(new Error('Failed to get current location: ' + error.message));
          }
        );
      }
    });
  };

  // Handle button click to get and center on current location with a marker
  const handleGetLocation = () => {
    setError(''); // Clear previous errors
    getCurrentLocation()
      .then(([latitude, longitude]) => {
        // Center map on current location with a moderate zoom level
        mapInstanceRef.current.setView([latitude, longitude], 10);

        // Define custom red marker icon (consistent with login.css primary color vibe)
        const redIcon = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', // Using red for emphasis on 'my location'
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
          shadowSize: [41, 41]
        });

        // Update or create marker for the current location
        if (markerRef.current) {
          markerRef.current.setLatLng([latitude, longitude]);
        } else {
          markerRef.current = L.marker([latitude, longitude], { icon: redIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup('Your Current Location')
            .openPopup(); // Open popup immediately
        }

        setError(''); // Clear any errors if the operation was successful
      })
      .catch((err) => {
        console.error("Error getting location:", err);
        setError(err.message); // Set error message
      });
  };

  // Initialize Leaflet map
  useEffect(() => {
    // Only initialize the map once
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([0, 0], 2); // Initial global view
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(mapInstanceRef.current);
    }

    // Cleanup on component unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove(); // Remove map instance to prevent memory leaks
        mapInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    // Main container styled as a card from login.css reference
    <div className="p-8 max-w-2xl mx-auto my-10 shadow-lg rounded-2xl bg-white border border-gray-200 transition-transform hover:translate-y-[-5px] hover:shadow-xl">
      {/* Title styled with deep green from login.css */}
      <h2 className="text-4xl font-extrabold text-[#2e7d32] mb-6 text-center tracking-tight">
        Current Location Map
      </h2>

      {/* Button styled with primary green from login.css */}
      <button
        onClick={handleGetLocation}
        className="w-full py-3 px-6 bg-[#4caf50] text-white font-semibold text-lg rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#388e3c] hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        Get My Location
      </button>

      {/* Error message display */}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {/* Leaflet map container (styling untouched for height, width, margin, per instruction) */}
      <div
        id="map"
        ref={mapRef}
        style={{ height: '400px', width: '100%', marginTop: '20px' }} // Leaflet's essential styles
        className="rounded-lg border border-gray-300 shadow-inner" // Added border and rounded corners for visual consistency
      ></div>
    </div>
  );
}

export default App;
