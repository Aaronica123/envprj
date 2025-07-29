import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LocationForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    location: '',
    coordinates: {
      type: 'Point',
      coordinates: ['', '']
    }
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for loading

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
    setMessage(''); // Clear previous messages
    setIsSubmitting(true); // Set submitting state

    try {
      const response = await fetch('http://localhost:3000/api/trial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // Ensure coordinates are numbers for submission
          coordinates: {
            ...formData.coordinates,
            coordinates: [parseFloat(formData.coordinates.coordinates[0]), parseFloat(formData.coordinates.coordinates[1])]
          }
        }),
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
      } else {
        setMessage(result.message || 'Failed to submit location.'); // Display server error message
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage('Failed to connect to the server. Please try again.');
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto my-10 shadow-lg rounded-2xl bg-white border border-gray-200 transition-transform hover:translate-y-[-5px] hover:shadow-xl">
      <h2 className="text-4xl font-extrabold text-[#2e7d32] mb-8 text-center tracking-tight">
        Add New Collection Point
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="location" className="block text-lg font-medium text-gray-700 mb-2">
            Location Name:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4caf50] focus:border-[#4caf50] sm:text-lg"
            placeholder="e.g., Downtown Recycling Center"
          />
        </div>

        <div>
          <label htmlFor="longitude" className="block text-lg font-medium text-gray-700 mb-2">
            Longitude:
          </label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.coordinates.coordinates[0]}
            onChange={handleChange}
            required
            
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4caf50] focus:border-[#4caf50] sm:text-lg"
            placeholder="e.g., 34.7523 (East/West position)"
          />
        </div>

        <div>
          <label htmlFor="latitude" className="block text-lg font-medium text-gray-700 mb-2">
            Latitude:
          </label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.coordinates.coordinates[1]}
            onChange={handleChange}
            required
         
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4caf50] focus:border-[#4caf50] sm:text-lg"
            placeholder="e.g., 0.2838 (North/South position)"
          />
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
          <button
            type="button" // Change to type="button" to prevent form submission
            onClick={() => navigate('/navbaradd')} // Use navigate to go back
            className="w-full sm:w-1/2 py-3 px-6 bg-gray-500 text-white font-semibold text-lg rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-600 hover:scale-105 active:scale-100"
          >
            Back to Home
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-1/2 py-3 px-6 bg-[#4caf50] text-white font-semibold text-lg rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#388e3c] hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Location'}
          </button>
        </div>
      </form>

      {message && (
        <p className={`mt-6 text-center text-lg ${message.includes('Failed') ? 'text-red-600' : 'text-green-700'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LocationForm;