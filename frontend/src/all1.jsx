import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

// Make sure Leaflet is included via index.html or a script tag, e.g.:
// <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
// <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

function App() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null); // Marker for current location
  const searchMarkersRef = useRef([]); // Markers for search results
  const [searchResults, setSearchResults] = useState({ message: '', count: 0, data: [] });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Initialize Leaflet map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([0, 0], 2); // Initial view
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(mapInstanceRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove(); // Remove map instance to prevent memory leaks
        mapInstanceRef.current = null;
      }
    };
  }, []);

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

  // Handle Get My Location button with search functionality
  const handleGetLocationAndSearch = async () => {
    setIsLoading(true); // Set loading state
    setError(''); // Clear previous errors

    try {
      const [latitude, longitude] = await getCurrentLocation();
      mapInstanceRef.current.setView([latitude, longitude], 10);

      const response = await fetch(`https://envprj.onrender.com/api/search?long=${longitude}&lat=${latitude}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to search locations');
      }

      setSearchResults({
        message: result.message,
        count: result.count || 0,
        data: result.data || []
      });

      searchMarkersRef.current.forEach(marker => marker.remove());
      searchMarkersRef.current = [];

      const isMatch = result.data.some(location =>
        location.coordinates.coordinates[0] === longitude &&
        location.coordinates.coordinates[1] === latitude
      );

      const redIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        shadowSize: [41, 41]
      });

      const greenIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        shadowSize: [41, 41]
      });

      if (markerRef.current) {
        markerRef.current.setLatLng([latitude, longitude]);
        markerRef.current.setIcon(isMatch ? greenIcon : redIcon);
        markerRef.current.setPopupContent(isMatch ? 'Your Location (Matched)' : 'Your Location');
      } else {
        markerRef.current = L.marker([latitude, longitude], { icon: isMatch ? greenIcon : redIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(isMatch ? 'Your Location (Matched)' : 'Your Location');
      }

      if (result.data && result.data.length > 0) {
        const bounds = [[latitude, longitude]];
        result.data.forEach(location => {
          const isSameAsCurrent = location.coordinates.coordinates[0] === longitude &&
                                 location.coordinates.coordinates[1] === latitude;

          if (!isSameAsCurrent) {
            const marker = L.marker([location.coordinates.coordinates[1], location.coordinates.coordinates[0]])
              .addTo(mapInstanceRef.current)
              .bindPopup(location.location);
            searchMarkersRef.current.push(marker);
            bounds.push([location.coordinates.coordinates[1], location.coordinates.coordinates[0]]);
          }
        });

        if (bounds.length > 0) {
          mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
      }

      setError('');
    } catch (error) {
      console.error("Error during location search:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate('/navbar'); // Replace '/navbar' with the actual link
  };

  return (
    <div className="p-8 max-w-2xl mx-auto my-10 shadow-lg rounded-2xl bg-white border border-gray-200 transition-transform hover:translate-y-[-5px] hover:shadow-xl">
      <h2 className="text-4xl font-extrabold text-[#2e7d32] mb-6 text-center tracking-tight">
        Current Location and Nearby Search
      </h2>

      {/* Back button */}
      <button
        onClick={handleBackClick}
        className="mb-4 py-2 px-4 bg-[#4caf50] text-white font-semibold text-base rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#388e3c] hover:scale-105 active:scale-100"
      >
        Back
      </button>

      {/* Get My Location button */}
      <button
        onClick={handleGetLocationAndSearch}
        className="w-full py-3 px-6 bg-[#4caf50] text-white font-semibold text-lg rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#388e3c] hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Get My Location and Search'}
      </button>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div
        id="map"
        ref={mapRef}
        style={{ height: '400px', width: '100%', marginTop: '20px' }}
        className="rounded-lg border border-gray-300 shadow-inner"
      ></div>

      <div className="mt-8 pt-4 border-t border-dashed border-gray-300">
        <h3 className="text-2xl font-semibold text-green-700 mb-3">Search Results:</h3>
        {searchResults.message && (
          <p className="text-gray-600 text-sm mb-2">{searchResults.message}</p>
        )}
        <p className="text-gray-700 mb-3">Found: <span className="font-bold">{searchResults.count}</span> locations nearby.</p>
        {isLoading && !error && (
          <p className="text-gray-500 text-center">Fetching results...</p>
        )}
        {searchResults.data.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-gray-700 max-h-40 overflow-y-auto pr-2">
            {searchResults.data.map((location, index) => (
              <li key={index} className="text-base">
                <span className="font-medium text-green-700">{location.location}</span>: [{location.coordinates.coordinates[0]}, {location.coordinates.coordinates[1]}]
              </li>
            ))}
          </ul>
        ) : (
          !isLoading && !error && <p className="text-gray-500">No nearby locations found. Try fetching your location.</p>
        )}
      </div>
    </div>
  );
}

export default App;