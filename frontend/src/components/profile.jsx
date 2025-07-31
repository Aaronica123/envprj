import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const Profile = ({ username }) => {
  const [userData, setUserData] = useState({ firstname: '', lastname: '', username: '', id: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userToFetch = username || sessionStorage.getItem("username");
    console.log('Profile component trying to fetch for username:', userToFetch);

    const fetchUserData = async () => {
      if (!userToFetch || typeof userToFetch !== 'string') {
        setError('No valid username found to fetch profile.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(`https://envprj.onrender.com/api/user?username=${encodeURIComponent(userToFetch)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API response for profile:', result);

        if (result.message === 'NotFound') {
          setError('User not found.');
          setUserData({ firstname: '', lastname: '', username: '', id: '' });
          return;
        }

        if (!result.data) {
          throw new Error('No user data returned from API.');
        }

        const { firstname, lastname, username: fetchedUsername, id } = result.data;
        setUserData({
          firstname: firstname || 'N/A',
          lastname: lastname || 'N/A',
          username: fetchedUsername || userToFetch || 'N/A',
          id: id || 'N/A',
        });
      } catch (error) {
        setError('Failed to fetch user profile. Please check connection and try again.');
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const handleBackClick = () => {
    navigate('/navbar');
  };

  return (
    <div className="profile-main-container">
      <div className="profile-card">
        <div className="profile-decor-top"></div>
        <div className="profile-decor-bottom"></div>

        <h3 className="profile-title">
          <svg className="profile-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          Your Profile
        </h3>

        <button onClick={handleBackClick} className="profile-back-button">
          Back
        </button>

        {isLoading && (
          <p className="profile-loading">
            <svg className="profile-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="profile-spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="profile-spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading profile...
          </p>
        )}
        {error && <p className="profile-error">{error}</p>}

        {!isLoading && !error && (
          <div className="profile-details">
            <p className="profile-field">
              <span className="profile-field-label">First Name:</span> {userData.firstname}
            </p>
            <p className="profile-field">
              <span className="profile-field-label">Last Name:</span> {userData.lastname}
            </p>
            <p className="profile-field">
              <span className="profile-field-label">Username:</span> {userData.username}
            </p>
            <p className="profile-field">
              <span className="profile-field-label">ID:</span> {userData.id}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;