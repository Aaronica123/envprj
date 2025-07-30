import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Import the back arrow icon

const StaffLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true); // Set submitting state

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Staff login successful: ${data.message}`);
        // Add a slight delay before navigating to let the user see the success message
        setTimeout(() => {
          navigate("/navbaradd"); // Redirect to staff panel on successful login
        }, 1500);
      } else {
        setError(data.message || 'Staff login failed: Invalid credentials.');
      }
    } catch (err) {
      console.error("Staff login error:", err); // Log the actual error
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    // Main container with full-screen background image matching the theme
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1594732675975-d9c0a64b9c1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQ4NzF8MHwxfHNlYXJjaHwxfHxlLXdhc3RlJTIwcmVjeWNsaW5nfGVufDB8fHx8MTY5MDExMDc3MXww&ixlib=rb-4.0.3&q=80&w=1080')",
      }}
    >
      {/* Staff Login Card Container */}
      <div className="p-8 max-w-sm w-full mx-auto my-10 shadow-xl rounded-2xl bg-white bg-opacity-90 border border-gray-200 text-center transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl relative">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')} // Redirect to the root path (usually your main auth selection)
          className="absolute top-4 left-4 p-2 bg-gray-500 text-white rounded-full shadow-md transition duration-300 ease-in-out hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-[#2e7d32] mb-8 mt-4 tracking-tight">
          Staff Login
        </h2>

        {/* Form for login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-2 text-left">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4caf50] focus:border-[#4caf50] text-lg"
              required
              placeholder="Enter staff username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2 text-left">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4caf50] focus:border-[#4caf50] text-lg"
              required
              placeholder="Enter staff password"
            />
          </div>

          {/* Messages (Error/Success) */}
          {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
          {message && <p className="text-green-700 text-sm mt-4">{message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-[#4caf50] text-white font-semibold text-lg rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#388e3c] hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffLogin;