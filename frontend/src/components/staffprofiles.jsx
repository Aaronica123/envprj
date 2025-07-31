import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './staffprofiles.css';

const StaffProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch('http://localhost:3000/api/staff', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API response for all profiles:', result);

        if (result.message === 'No staff') {
          setError('No staff profiles found.');
          setProfiles([]);
          return;
        }

        if (!result.data || !Array.isArray(result.data)) {
          throw new Error('No valid profile data returned from API.');
        }

        setProfiles(
          result.data.map((profile) => ({
            firstname: profile.firstname || 'N/A',
            lastname: profile.lastname || 'N/A',
            username: profile.username || 'N/A',
            id: profile.id || 'N/A',
          }))
        );
      } catch (error) {
        setError('Failed to fetch profiles. Please check connection and try again.');
        console.error('Error fetching profiles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleBackClick = () => {
    navigate('/allprofile');
  };

  const handleNextClick = () => {
    navigate('/userprofile');
  };

  return (
    <div className="staff-profiles-main-container">
      <div className="staff-profiles-card">
        <div className="staff-profiles-decor-top"></div>
        <div className="staff-profiles-decor-bottom"></div>

        <h3 className="staff-profiles-title">
          <svg className="staff-profiles-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          All Staff Profiles
        </h3>

        <div className="staff-profiles-nav-container">
          <button
            onClick={handleBackClick}
            className="staff-profiles-button"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="staff-profiles-button-icon" />
            Back
          </button>

          <button
            onClick={handleNextClick}
            className="staff-profiles-button"
            aria-label="Go to user profiles"
          >
            Next
            <ArrowRight size={20} className="staff-profiles-button-icon" />
          </button>
        </div>

        {isLoading && (
          <p className="staff-profiles-loading">
            <svg className="staff-profiles-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="staff-profiles-spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="staff-profiles-spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading profiles...
          </p>
        )}
        {error && <p className="staff-profiles-error">{error}</p>}

        {!isLoading && !error && profiles.length === 0 && (
          <p className="staff-profiles-no-data">No staff profiles available.</p>
        )}

        {!isLoading && !error && profiles.length > 0 && (
          <ul className="staff-profiles-list">
            {profiles.map((profile, index) => (
              <li
                key={profile.id || index}
                className="staff-profiles-item"
              >
                <p className="staff-profiles-field">
                  <span className="staff-profiles-field-label">First Name:</span> {profile.firstname}
                </p>
                <p className="staff-profiles-field">
                  <span className="staff-profiles-field-label">Last Name:</span> {profile.lastname}
                </p>
                <p className="staff-profiles-field">
                  <span className="staff-profiles-field-label">Username:</span> {profile.username}
                </p>
                <p className="staff-profiles-field">
                  <span className="staff-profiles-field-label">ID:</span> {profile.id}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StaffProfiles;