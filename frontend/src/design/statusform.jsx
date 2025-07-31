import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './statusform.css';

const StatusDisplay = () => {
  const [statusData, setStatusData] = useState([]);
  const [message, setMessage] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);

  // Fetch status data
  const fetchStatusData = async () => {
    try {
      const resp = await fetch('https://envprj.onrender.com/api/fetchstatus', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }
      const result = await resp.json();
      console.log('Fetched data:', result);
      if (result && result.data && Array.isArray(result.data)) {
        const sortedData = result.data.sort((a, b) => b._id.localeCompare(a._id));
        setStatusData(sortedData);
        setMessage(result.message || 'Present data');
      } else if (result.message === 'Lack of data') {
        setMessage('No status data available.');
      } else {
        console.warn('Invalid response format:', result);
        setFetchError('Invalid data format received from server.');
      }
    } catch (error) {
      console.error('Error fetching status data:', error);
      setFetchError(`Failed to load status data: ${error.message}`);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchStatusData();
  }, []);

  // Auto-refresh effect
  useEffect(() => {
    let intervalId;
    if (isAutoRefresh) {
      intervalId = setInterval(fetchStatusData, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isAutoRefresh]);

  // Toggle auto-refresh
  const handleToggleRefresh = () => {
    setIsAutoRefresh((prev) => !prev);
  };

  // Split data into Working and Failed
  const workingData = statusData.filter((item) => item.status === 'Working');
  const failedData = statusData.filter((item) => item.status === 'Failed');

  return (
    <div className="status-display-main-container">
      <div className="status-display-container">
        <h2 className="status-display-title">Status Data</h2>

        {/* Auto-Refresh Button */}
        <button
          onClick={handleToggleRefresh}
          className="status-display-refresh-button"
          disabled={isAutoRefresh}
        >
          {isAutoRefresh ? 'Auto-Refresh On' : 'Toggle Auto-Refresh'}
        </button>

        {/* Working Status Table */}
        <div className="status-display-table-container">
          <h3 className="status-display-title">Working Status</h3>
          {workingData.length > 0 ? (
            <table className="status-display-table">
              <thead>
                <tr>
                  <th className="status-display-th-working">Location</th>
                  <th className="status-display-th-working">Status</th>
                </tr>
              </thead>
              <tbody>
                {workingData.map((item, index) => (
                  <tr key={index}>
                    <td className="status-display-td">{item.location}</td>
                    <td className="status-display-td">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="status-display-message status-display-message-error">
              No working status data available.
            </p>
          )}
        </div>

        {/* Failed Status Table */}
        <div className="status-display-table-container">
          <h3 className="status-display-title">Failed Status</h3>
          {failedData.length > 0 ? (
            <table className="status-display-table">
              <thead>
                <tr>
                  <th className="status-display-th-failed">Location</th>
                  <th className="status-display-th-failed">Status</th>
                </tr>
              </thead>
              <tbody>
                {failedData.map((item, index) => (
                  <tr key={index}>
                    <td className="status-display-td">{item.location}</td>
                    <td className="status-display-td">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="status-display-message status-display-message-error">
              No failed status data available.
            </p>
          )}
        </div>

        {/* Navigation Button */}
        <Link to="/dash">
          <button className="status-display-back-button">Back to Navigation</button>
        </Link>
      </div>
    </div>
  );
};

export default StatusDisplay;