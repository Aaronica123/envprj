import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react'; // Added ArrowRight for next button

const AllProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Define custom keyframe animation for profile items
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
    const fetchProfiles = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch('http://localhost:3000/api/pr', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API response for all profiles:', result); // Debug

        if (result.message === 'No admins') {
          setError('No admin profiles found.');
          setProfiles([]);
          return;
        }

        if (!result.data || !Array.isArray(result.data)) {
          throw new Error('No valid profile data returned from API.');
        }

        // Set profiles with fallback values
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
  }, []); // Empty dependency array to fetch once on mount

  // Handle back button click
  const handleBackClick = () => {
    navigate('/dash'); // Navigate to dashboard
  };

  // Handle next button click
  const handleNextClick = () => {
    navigate('/staffprofile'); // Navigate to staff profiles
  };

  return (
    <>
      <style>{profileAnimationStyles}</style>
      {/* Main container */}
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#e0f2f7] to-[#b2ebf2] p-5">
        {/* Profiles Card */}
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-2xl w-full flex flex-col gap-6 border border-[#dcdcdc] transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1/4 bg-[#4caf50] rounded-t-2xl opacity-80" style={{ transform: 'skewY(-5deg)', transformOrigin: 'top left' }}></div>
          <div className="absolute bottom-0 right-0 w-full h-1/4 bg-[#90a4ae] rounded-b-2xl opacity-80" style={{ transform: 'skewY(-5deg)', transformOrigin: 'bottom right' }}></div>

          {/* Title */}
          <h3 className="text-3xl font-extrabold text-[#2e7d32] mt-4 mb-4 tracking-tight flex items-center justify-center gap-3 relative z-10">
            <svg className="w-9 h-9 text-[#4caf50] animate-profile-pop" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            All Admin Profiles
          </h3>

          {/* Navigation Buttons */}
          <div className="flex justify-between relative z-10">
            {/* Back Button */}
            <button
              onClick={handleBackClick}
              className="py-2 px-4 bg-[#4caf50] text-white font-semibold text-base rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#388e3c] hover:scale-105 active:scale-100"
              aria-label="Go back"
            >
              <ArrowLeft size={20} className="inline mr-2" />
              Back
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextClick}
              className="py-2 px-4 bg-[#4caf50] text-white font-semibold text-base rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#388e3c] hover:scale-105 active:scale-100"
              aria-label="Go to staff profiles"
            >
              Next
              <ArrowRight size={20} className="inline ml-2" />
            </button>
          </div>

          {isLoading && (
            <p className="text-gray-600 text-lg flex items-center justify-center gap-2 relative z-10">
              <svg className="animate-spin h-6 w-6 text-[#4caf50]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading profiles...
            </p>
          )}
          {error && <p className="text-red-600 font-medium relative z-10">{error}</p>}

          {!isLoading && !error && profiles.length === 0 && (
            <p className="text-gray-600 text-lg relative z-10">No admin profiles available.</p>
          )}

          {!isLoading && !error && profiles.length > 0 && (
            <ul className="text-left relative z-10 space-y-4">
              {profiles.map((profile, index) => (
                <li
                  key={profile.id || index} // Use id as key, fallback to index if id is N/A
                  className="p-4 bg-[#f5f5f5] rounded-lg shadow-sm border border-[#dcdcdc] transition-transform duration-200 hover:bg-[#e8f5e9]"
                >
                  <p className="text-gray-800 text-base mb-2 pb-1 border-b border-dashed border-[#c8e6c9]">
                    <span className="font-semibold text-[#2e7d32]">First Name:</span> {profile.firstname}
                  </p>
                  <p className="text-gray-800 text-base mb-2 pb-1 border-b border-dashed border-[#c8e6c9]">
                    <span className="font-semibold text-[#2e7d32]">Last Name:</span> {profile.lastname}
                  </p>
                  <p className="text-gray-800 text-base mb-2 pb-1 border-b border-dashed border-[#c8e6c9]">
                    <span className="font-semibold text-[#2e7d32]">Username:</span> {profile.username}
                  </p>
                  <p className="text-gray-800 text-base">
                    <span className="font-semibold text-[#2e7d32]">ID:</span> {profile.id}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProfiles;