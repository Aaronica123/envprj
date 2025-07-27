import React, { useState } from 'react';

const LocationForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    coordinates: {
      type: 'Point',
      coordinates: ['', '']
    }
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'longitude' || name === 'latitude') {
      setFormData((prev) => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          coordinates: name === 'longitude' 
            ? [value, prev.coordinates.coordinates[1]]
            : [prev.coordinates.coordinates[0], value]
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/trial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setMessage(result.message);

      if (response.ok) {
        setFormData({
          location: '',
          coordinates: {
            type: 'Point',
            coordinates: ['', '']
          }
        });
      }
    } catch (error) {
      setMessage('Failed to send data');
    }
  };

  return (
    <div>
      <h2>Submit Location Data</h2>
      <div>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Longitude:
          <input
            type="number"
            name="longitude"
            value={formData.coordinates.coordinates[0]}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Latitude:
          <input
            type="number"
            name="latitude"
            value={formData.coordinates.coordinates[1]}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LocationForm;