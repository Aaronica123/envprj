import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

const GetAllLocations1 = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [allLocations, setAllLocations] = useState({ message: '', data: [] });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCoords, setShowCoords] = useState(false);
  const [filter, setFilter] = useState('all'); // Default to 'all'

  // Define custom marker icons
  const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  const greenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  const redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  // Calculate total sum of phone, printer, and laptop
  const getTotalSum = (stat) => {
    return (stat.phone || 0) + (stat.printer || 0) + (stat.laptop || 0);
  };

  // Initialize map
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

  // Update markers based on filter and showCoords
  const updateMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const filteredData = allLocations.data.filter(stat => {
      const totalSum = getTotalSum(stat);
      if (filter === 'gt500') return totalSum > 500;
      if (filter === 'gt200lt500') return totalSum > 200 && totalSum < 500;
      if (filter === 'lte200') return totalSum <= 200;
      return true; // 'all'
    });

    if (filteredData.length > 0) {
      const bounds = [];
      filteredData.forEach(stat => {
        if (stat.lat != null && stat.long != null) {
          const totalSum = getTotalSum(stat);
          const markerIcon = totalSum > 500 ? redIcon : totalSum > 200 ? greenIcon : defaultIcon;
          const popupContent = `
            <div>
              <h2 class="font-bold text-xl">${stat.location}</h2>
              <p>Phone: ${stat.phone}</p>
              <p>Printer: ${stat.printer}</p>
              <p>Laptop: ${stat.laptop}</p>
              <p>Total: ${totalSum}</p>
              ${showCoords ? `
                <p>Latitude: ${stat.lat.toFixed(4)}</p>
                <p>Longitude: ${stat.long.toFixed(4)}</p>
              ` : ''}
            </div>
          `;
          const marker = L.marker([stat.lat, stat.long], { icon: markerIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(popupContent);
          marker.stat = stat;
          markersRef.current.push(marker);
          bounds.push([stat.lat, stat.long]);
        }
      });

      if (bounds.length > 0) {
        mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  };

  // Toggle coordinates in popups
  const toggleCoords = () => {
    setShowCoords(prev => !prev);
    updateMarkers();
  };

  // Handle radio button change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Fetch data and update map
  const handleGetAll = async () => {
    setIsLoading(true);
    setError('');

    try {
      console.log('Fetching from http://localhost:3000/getAllStats1');
      const response = await fetch('http://localhost:3000/api/getall1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log('Response data:', result);
      setAllLocations({
        message: result.message || '',
        data: Array.isArray(result) ? result : []
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      setError('Failed to fetch stats. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update markers when filter or data changes
  useEffect(() => {
    if (allLocations.data.length > 0) {
      updateMarkers();
    }
  }, [allLocations.data, filter]);

  return (
    <div className="p-8 max-w-2xl mx-auto my-10 shadow-lg rounded-2xl bg-white border border-gray-200 transition-transform hover:translate-y-[-5px] hover:shadow-xl">
      <h2 className="text-4xl font-extrabold text-[#2e7d32] mb-6 text-center tracking-tight">
        E-Waste Collection Stats
      </h2>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
        <button
          type="button"
          onClick={() => navigate('/navbaradd')}
          className="w-full sm:w-1/2 py-3 px-6 bg-gray-500 text-white font-semibold text-lg rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-600 hover:scale-105 active:scale-100"
        >
          Back to Add Location
        </button>
        <button
          onClick={handleGetAll}
          disabled={isLoading}
          className="w-full sm:w-1/2 py-3 px-6 bg-[#4caf50] text-white font-semibold text-lg rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#388e3c] hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Loading Stats...' : 'Get All Stats'}
        </button>
        <button
          onClick={toggleCoords}
          className="w-full sm:w-1/2 py-3 px-6 bg-blue-500 text-white font-semibold text-lg rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-600 hover:scale-105 active:scale-100"
        >
          {showCoords ? 'Hide Coordinates' : 'Show Coordinates'}
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Filter by Total E-Waste:</h3>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="gt500"
              checked={filter === 'gt500'}
              onChange={handleFilterChange}
              className="mr-2"
            />
            <span className="text-gray-700">Total &gt; 500 (Red)</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="gt200lt500"
              checked={filter === 'gt200lt500'}
              onChange={handleFilterChange}
              className="mr-2"
            />
            <span className="text-gray-700">Total &gt; 200 and &lt; 500 (Green)</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="lte200"
              checked={filter === 'lte200'}
              onChange={handleFilterChange}
              className="mr-2"
            />
            <span className="text-gray-700">Total &le; 200 (Blue)</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="all"
              checked={filter === 'all'}
              onChange={handleFilterChange}
              className="mr-2"
            />
            <span className="text-gray-700">All</span>
          </label>
        </div>
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
          <h3 className="text-2xl font-semibold text-green-700 mb-3">Available Stats:</h3>
          <p className="text-gray-700 mb-3">Found: <span className="font-bold">{allLocations.data.length}</span> locations.</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 max-h-40 overflow-y-auto pr-2">
            {allLocations.data.map((stat, index) => (
              <li key={index} className="text-base">
                <span className="font-medium text-green-700">{stat.location}</span>: (Lat: {stat.lat?.toFixed(4)}, Lng: {stat.long?.toFixed(4)})
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

export default GetAllLocations1;