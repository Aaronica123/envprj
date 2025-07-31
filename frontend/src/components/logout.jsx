import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./logout.css"; // Import the CSS file

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

  return (
    <div className="logout-main-container">
      {/* Logout Card */}
      <div className="logout-card">
        <h2 className="logout-title">Logout</h2>
        <p className="logout-description">Click the button below to safely log out of your account.</p>
        <button
          onClick={handleLogoutClick}
          className="logout-button"
        >
          Log Out
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="logout-confirm-modal-container">
          <div className="logout-confirm-modal-content">
            <p className="logout-modal-message">{modalMessage}</p>
            <div className="logout-button-container">
              <button
                onClick={confirmLogout}
                className="logout-confirm-button"
              >
                Yes, Log Out
              </button>
              <button
                onClick={cancelLogout}
                className="logout-cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal (for "You have been logged out.") */}
      {showMessageModal && (
        <div className="logout-message-modal-container">
          <div className="logout-message-modal-content">
            <p className="logout-message-modal-text">{modalMessage}</p>
            {/* This modal automatically closes and redirects */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Logout;