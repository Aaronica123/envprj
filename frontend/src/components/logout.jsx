import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for confirm logout modal
  const [showMessageModal, setShowMessageModal] = useState(false); // State for success/failure message modal
  const [modalMessage, setModalMessage] = useState(''); // Message to display in the modal

  // Check session state on component mount to prevent unauthorized access
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/"); // Redirect to login if not logged in
    }
  }, [navigate]);

  // Handler for opening the confirmation modal
  const handleLogoutClick = () => {
    setModalMessage("Are you sure you want to log out?");
    setShowConfirmModal(true);
  };

  // Handler for confirming logout from the modal
  const confirmLogout = () => {
    setShowConfirmModal(false); // Close confirm modal
    // Clear session storage to simulate logout
    sessionStorage.removeItem("isLoggedIn");
    setModalMessage("You have been logged out."); // Set success message
    setShowMessageModal(true); // Show message modal

    // Redirect after a short delay to allow user to see the message
    setTimeout(() => {
      setShowMessageModal(false); // Close message modal
      navigate("/"); // Redirect to login page
    }, 1500); // 1.5 seconds delay
  };

  // Handler for canceling logout from the modal
  const cancelLogout = () => {
    setShowConfirmModal(false); // Close confirm modal
  };

  // Handler for closing the message modal (if needed, though it auto-closes here)
  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      {/* Logout Card */}
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-sm w-full border border-green-200 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Logout</h2>
        <p className="text-gray-600 mb-8">Click the button below to safely log out of your account.</p>
        <button
          onClick={handleLogoutClick}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          Log Out
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 shadow-2xl max-w-sm w-full text-center border border-gray-300">
            <p className="text-lg font-semibold mb-4 text-gray-800">{modalMessage}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Yes, Log Out
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal (for "You have been logged out.") */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 shadow-2xl max-w-xs w-full text-center border border-gray-300">
            <p className="text-lg font-semibold mb-4 text-green-700">{modalMessage}</p>
            {/* This modal automatically closes and redirects */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Logout;
