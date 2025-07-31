import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './adminlogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://envprj.onrender.com/api/getad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => {
          navigate("/navbaradd");
        }, 1500);
      } else {
        setError(data.message || 'Login failed. Invalid credentials.');
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <button
          onClick={() => navigate('/')}
          className="admin-login-back-button"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="admin-login-title">
          Admin Login
        </h2>
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
              placeholder="Enter admin username"
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
              placeholder="Enter admin password"
            />
          </div>
          {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
          {message && <p className="text-green-700 text-sm mt-4">{message}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="admin-login-submit-button"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;