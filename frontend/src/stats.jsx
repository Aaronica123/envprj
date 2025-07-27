import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DataSummary = () => {
  const [data, setData] = useState({
    phone: 0,
    laptop: 0,
    printer: 0,
    message: ''
  });
  const [error, setError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  let refreshInterval = null; // Declare refreshInterval with 'let' for reassignment

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/fetch', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        // Ensure that fetched data structure matches state initial structure
        setData({
            phone: result.phone || 0,
            laptop: result.laptop || 0,
            printer: result.printer || 0,
            message: result.message || '' // Assuming a message field might come from API
        });
        setError('');
      } else {
        const errorText = await response.text(); // Get more detailed error message
        setError(`Failed to fetch data: ${errorText || 'Server error'}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Network error or server unavailable. Failed to fetch data.');
    }
  };

  // Effect hook to fetch data on component mount and handle auto-refresh
  useEffect(() => {
    fetchData(); // Fetch data initially when component mounts

    if (isRefreshing) {
      // Set up interval only if isRefreshing is true
      refreshInterval = setInterval(fetchData, 3000); // Refresh every 3 seconds
    }

    // Cleanup function to clear the interval when the component unmounts or isRefreshing changes
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [isRefreshing]); // Dependency array: re-run effect when isRefreshing changes

  // Handler to toggle auto-refresh
  const handleRefreshToggle = () => {
    setIsRefreshing((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50"> {/* Overall container for centering */}
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full border border-green-200">
        {/* Component Title */}
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          E-Waste Collection Summary
        </h2>

        {/* Refresh Button */}
        <button
          onClick={handleRefreshToggle}
          className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all duration-300 ease-in-out shadow-md hover:shadow-lg mb-6
            ${isRefreshing ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {isRefreshing ? 'Stop Auto-Refresh' : 'Start Auto-Refresh'}
        </button>

        {/* Error Display */}
        {error ? (
          <p className="text-red-600 text-center font-medium">{error}</p>
        ) : (
          <div className="space-y-4">
            {/* Data Display */}
            <div className="bg-green-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-800 text-lg flex justify-between items-center">
                <span className="font-semibold text-green-800">Phones:</span>
                <span className="font-bold text-green-600">{data.phone} kg</span>
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-800 text-lg flex justify-between items-center">
                <span className="font-semibold text-green-800">Laptops:</span>
                <span className="font-bold text-green-600">{data.laptop} kg</span>
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-800 text-lg flex justify-between items-center">
                <span className="font-semibold text-green-800">Printers:</span>
                <span className="font-bold text-green-600">{data.printer} kg</span>
              </p>
            </div>
            {data.message && (
              <p className="text-gray-600 text-center mt-4">
                <span className="font-semibold">Message from Server:</span> {data.message}
              </p>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 space-x-4">
          <Link to={"/stats"} className="w-1/2">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
              Submit More Data
            </button>
          </Link>
          <Link to={"/navbar"} className="w-1/2">
            <button className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
              Back to Navigation
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DataSummary;
