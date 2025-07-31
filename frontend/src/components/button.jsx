import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, Briefcase } from 'lucide-react';
import './button.css';

const AuthButtons = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/log');
  };

  const handleRegisterClick = () => {
    navigate('/admin');
  };

  const handleStaffLoginClick = () => {
    navigate('/stafflogin');
  };

  return (
    <div className="auth-buttons-container">
      <div className="auth-buttons-card">
        <h2 className="auth-buttons-title">
          E-Waste Collection Access
        </h2>
        <p className="text-gray-700 text-lg mb-8">Please select your role:</p>
        <div className="flex flex-col space-y-6">
          <button
            onClick={handleLoginClick}
            className="auth-user-login-button"
          >
            <User size={24} />
            <span>User Login</span>
          </button>
          <button
            onClick={handleRegisterClick}
            className="auth-admin-login-button"
          >
            <ShieldCheck size={24} />
            <span>Administrator Panel</span>
          </button>
          <button
            onClick={handleStaffLoginClick}
            className="auth-staff-login-button"
          >
            <Briefcase size={24} />
            <span>Staff Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthButtons;