import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

// Ensure Tailwind CSS is available, e.g., via CDN in index.html:
// <script src="https://cdn.tailwindcss.com"></script>

const Profile = ({ username }) => {
  const [userData, setUserData] = useState({ firstname: '', lastname: '', username: '',id:'' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Define custom keyframe animation for the profile icon
  const profileAnimationStyles = `
    @keyframes profile-pop {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-2px); /* A slight upward bob */
      }
    }
    .animate-profile-pop {
      animation: profile-pop 2s infinite ease-in-out;
    }
  `;

  useEffect(() => {
    // Attempt to retrieve username from props first, then sessionStorage if props is not provided
    const userToFetch = username || sessionStorage.getItem("username");
    console.log('Profile component trying to fetch for username:', userToFetch); // Debug

    const fetchUserData = async () => {
      if (!userToFetch || typeof userToFetch !== 'string') {
        setError('No valid username found to fetch profile.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(`http://localhost:3000/api/user?username=${encodeURIComponent(userToFetch)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API response for profile:', result); // Debug: Log API response

        if (result.message === 'NotFound') {
          setError('User not found.');
          setUserData({ firstname: '', lastname: '', username: '',id:'' }); // Clear data if not found
          return;
        }

        if (!result.data) {
          throw new Error('No user data returned from API.');
        }

        // Extract fields, providing 'N/A' fallbacks for missing data
        const { firstname, lastname, username: fetchedUsername,id } = result.data;
        setUserData({
          firstname: firstname || 'N/A',
          lastname: lastname || 'N/A',
          username: fetchedUsername || userToFetch || 'N/A', 
          id:id|| 'N/A',// Use fetched username, fallback to initial, then N/A
        });
      } catch (error) {
        setError('Failed to fetch user profile. Please check connection and try again.');
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [username]); // Depend on the `username` prop, so it refetches if the prop changes

  // Handle back button click
  const handleBackClick = () => {
    navigate('/navbar'); // Replace '/navbar' with the actual link
  };

  return (
    // Inject the custom styles
    <>
      <style>{profileAnimationStyles}</style>
      {/* Main container (similar to body/login-container from login.css) */}
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#e0f2f7] to-[#b2ebf2] p-5">
        {/* Profile Card (similar to login-card from login.css) */}
        <div className="
          bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full
          flex flex-col gap-6 border border-[#dcdcdc]
          transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-2xl
          relative overflow-hidden
        ">
          {/* Decorative elements for the e-waste theme */}
          <div className="absolute top-0 left-0 w-full h-1/4 bg-[#4caf50] rounded-t-2xl opacity-80" style={{ transform: 'skewY(-5deg)', transformOrigin: 'top left' }}></div>
          <div className="absolute bottom-0 right-0 w-full h-1/4 bg-[#90a4ae] rounded-b-2xl opacity-80" style={{ transform: 'skewY(-5deg)', transformOrigin: 'bottom right' }}></div>

          {/* Profile Title with an e-waste icon */}
          <h3 className="
            text-3xl font-extrabold text-[#2e7d32] mt-4 mb-4 tracking-tight flex items-center justify-center gap-3
            relative z-10
          ">
            <svg className="w-9 h-9 text-[#4caf50] animate-profile-pop" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {/* Profile / User icon (simple SVG for a modern look) */}
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Your Profile
          </h3>

          {/* Back button */}
          <button
            onClick={handleBackClick}
            className="py-2 px-4 bg-[#4caf50] text-white font-semibold text-base rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#388e3c] hover:scale-105 active:scale-100 relative z-10"
          >
            Back
          </button>

          {isLoading && (
            <p className="profile-loading text-gray-600 text-lg flex items-center justify-center gap-2 relative z-10">
              <svg className="animate-spin h-6 w-6 text-[#4caf50]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading profile...
            </p>
          )}
          {error && <p className="error-message text-red-600 font-medium relative z-10">{error}</p>}

          {!isLoading && !error && (
            <div className="profile-details text-left relative z-10">
              <p className="profile-field text-gray-800 text-lg mb-3 pb-2 border-b border-dashed border-[#c8e6c9]">
                <span className="font-semibold text-[#2e7d32]">First Name:</span> {userData.firstname}
              </p>
              <p className="profile-field text-gray-800 text-lg mb-3 pb-2 border-b border-dashed border-[#c8e6c9]">
                <span className="font-semibold text-[#2e7d32]">Last Name:</span> {userData.lastname}
              </p>
              <p className="profile-field text-gray-800 text-lg pb-2">
                <span className="font-semibold text-[#2e7d32]">Username:</span> {userData.username}
              </p>
               <p className="profile-field text-gray-800 text-lg pb-2">
                <span className="font-semibold text-[#2e7d32]">ID:</span> {userData.id}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;