import React, { useState, useEffect } from 'react';
import './statusin.css';

const StatusForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    status: ''
  });
  const [message, setMessage] = useState('');
  const [locations, setLocations] = useState([]);
  const [fetchError, setFetchError] = useState('');

  // Handle changes to form input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setMessage(''); // Clear previous messages
  };

  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const resp = await fetch('https://envprj.onrender.com/api/get', {
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
        const h = [];
        if (result && result.data && Array.isArray(result.data)) {
          result.data.forEach((e) => {
            if (e.location) h.push(e.location);
          });
          setLocations([...new Set(h)]); // Remove duplicates
        } else {
          console.warn('Invalid response format:', result);
          setFetchError('Invalid data format received from server.');
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
        setFetchError(`Failed to load locations: ${error.message}`);
      }
    };
    fetchLocations();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.location) {
      setMessage('Please select a location.');
      return;
    }
    if (!formData.status) {
      setMessage('Please select a status.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Status submitted successfully!');
        setFormData({ location: '', status: '' }); // Clear form
      } else {
        const errorData = await response.json();
        setMessage(`Submission failed: ${errorData.message || 'Server error'}`);
      }
    } catch (error) {
      console.error('Error during submission:', error);
      setMessage('An unexpected error occurred during submission.');
    }
  };

  return (
    <div className="status-form-main-container">
      <div className="status-form-container">
        <h2 className="status-form-title">Submit Status</h2>

        {/* Location Select Field */}
        <div className="status-form-field-container">
          <label htmlFor="location" className="status-form-label">
            Location:
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="status-form-select"
          >
            <option value="">-- Select Location --</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Status Select Field */}
        <div className="status-form-field-container">
          <label htmlFor="status" className="status-form-label">
            Status:
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="status-form-select"
          >
            <option value="">-- Select Status --</option>
            <option value="Working">Working</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="status-form-submit-button"
        >
          Submit Status
        </button>

        {/* Message Display */}
        {(message || fetchError) && (
          <p className={`status-form-message ${message.includes('successfully') || fetchError.includes('successfully') ? 'status-form-message-success' : 'status-form-message-error'}`}>
            {message || fetchError}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatusForm;