import React from 'react';
import { useNavigate } from 'react-router-dom';
// Import icons from lucide-react
import { User, ShieldCheck } from 'lucide-react';

const AuthButtons = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/log');
  };

  const handleRegisterClick = () => {
    navigate('/admin');
  };

  return (
    // Main container with a full-screen background image representing e-waste recycling
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1594732675975-d9c0a64b9c1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQ4NzF8MHwxfHNlYXJjaHwxfHxlLXdhc3RlJTIwcmVjeWNsaW5nfGVufDB8fHx8MTY5MDExMDc3MXww&ixlib=rb-4.0.3&q=80&w=1080')",
      }}
    >
      {/* Card container for the buttons, centered and with a slightly transparent background */}
      <div className="p-8 max-w-sm w-full mx-auto my-10 shadow-xl rounded-2xl bg-white bg-opacity-90 border border-gray-200 text-center transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl">
        {/* Title reflecting the e-waste theme */}
        <h2 className="text-4xl font-extrabold text-[#2e7d32] mb-8 tracking-tight">
          E-Waste Collection Access
        </h2>
        {/* Subtitle for clarity */}
        <p className="text-gray-700 text-lg mb-8">Please select your role:</p>

        {/* Flex container for the buttons, allowing them to stack or appear side-by-side */}
        <div className="flex flex-col space-y-6">
          {/* User Login Button */}
          <button
            onClick={handleLoginClick}
            className="w-full py-4 px-6 bg-[#4caf50] text-white font-bold text-xl rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-[#388e3c] hover:scale-105 active:scale-100 flex items-center justify-center space-x-3 focus:outline-none focus:ring-2 focus:ring-[#388e3c] focus:ring-opacity-50"
          >
            <User size={24} /> {/* User icon */}
            <span>User Login</span>
          </button>

          {/* Administrator Login Button */}
          <button
            onClick={handleRegisterClick}
            className="w-full py-4 px-6 bg-[#6a9955] text-white font-bold text-xl rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-[#527a3c] hover:scale-105 active:scale-100 flex items-center justify-center space-x-3 focus:outline-none focus:ring-2 focus:ring-[#527a3c] focus:ring-opacity-50"
          >
            <ShieldCheck size={24} /> {/* Administrator icon */}
            <span>Administrator Panel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthButtons;