import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './stafflogin.css';

const StaffLogin = () => {
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
      const response = await fetch('https://envprj.onrender.com/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Staff login successful: ${data.message}`);
        setTimeout(() => {
          navigate("/staffbar");
        }, 1500);
      } else {
        setError(data.message || 'Staff login failed: Invalid credentials.');
      }
    } catch (err) {
      console.error("Staff login error:", err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="staff-login-main-container">
      <div className="staff-login-card">
        <button
          onClick={() => navigate('/')}
          className="staff-login-back-button"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        <h2 className="staff-login-title">
          Staff Login
        </h2>

        <form onSubmit={handleSubmit} className="staff-login-form">
          <div>
            <label htmlFor="username" className="staff-login-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="staff-login-input"
              required
              placeholder="Enter staff username"
            />
          </div>
          <div>
            <label htmlFor="password" className="staff-login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="staff-login-input"
              required
              
              placeholder="Enter staff password"
            />
          </div>

          {error && <p className="staff-login-error">{error}</p>}
          {message && <p className="staff-login-message">{message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="staff-login-button"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffLogin;