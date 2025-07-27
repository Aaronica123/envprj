import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DataForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    type: ''
  });
  const [message, setMessage] = useState(''); // State to display success/failure messages

  // Handles changes to form input fields (amount and type)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value // Update the specific field in formData
    });
    setMessage(''); // Clear previous messages when user starts typing/selecting
  };

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Input validation: Ensure a type is selected and amount is provided
    if (!formData.type) {
      setMessage('Please select an e-waste type.');
      return;
    }
    if (!formData.amount || formData.amount <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }

    try {
      // Send data to the backend API
      const response = await fetch('https://envprj.onrender.com/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert form data to JSON string
      });

      // Check if the request was successful
      if (response.ok) {
        setMessage('Data submitted successfully!');
        setFormData({ amount: '', type: '' }); // Clear the form fields on success
      } else {
        const errorData = await response.json(); // Parse error message from response
        setMessage(`Submission failed: ${errorData.message || 'Server error'}`);
      }
    } catch (error) {
      console.error("Error during data submission:", error);
      setMessage('An unexpected error occurred during submission.'); // Generic error message for network issues etc.
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50"> {/* Overall container for centering */}
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full border border-green-200">
        {/* Form Title */}
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Submit E-Waste Data
        </h2>

        {/* Amount Input Field */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
            Amount (in kg):
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200 ease-in-out"
            placeholder="e.g., 5.0"
            min="0" // Ensure amount is not negative
            step="0.1" // Allow decimal amounts
          />
        </div>

        {/* Type Select Field */}
        <div className="mb-6">
          <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
            E-Waste Type:
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200 ease-in-out bg-white"
          >
            <option value="">-- Select Type --</option>
            <option value="phone">Phones</option>
            <option value="laptop">Laptops</option>
            <option value="printer">Printers</option>
            <option value="monitor">Monitors</option>
            <option value="tv">Televisions</option>
            <option value="battery">Batteries</option>
            <option value="other">Other Electronics</option>
          </select>
        </div>

        {/* Submission Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out shadow-md hover:shadow-lg mb-4"
        >
          Submit Data
        </button>

        {/* Message Display */}
        {message && (
          <p className={`text-center mt-4 font-medium ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 space-x-4">
          <Link to={"/summ"} className="w-1/2">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
              View Statistics
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

export default DataForm;
