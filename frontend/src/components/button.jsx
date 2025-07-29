import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthButtons = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/log');
  };

  const handleRegisterClick = () => {
    navigate('/admin');
  };

  return (
    <div>
      <button onClick={handleLoginClick}>User</button>
      <button onClick={handleRegisterClick}>Administartor</button>
    </div>
  );
};

export default AuthButtons;