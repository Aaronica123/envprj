import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart, Map, Search, MapPin, User, LogOut } from 'lucide-react';
import EwasteOverviewContent from './EwasteOverviewContent';
import "./navbar.css"; // Import the CSS file

function NavBar() {
  const [showAlert, setShowAlert] = useState(false);
  const [daysToSaturday, setDaysToSaturday] = useState(0);

  // Calculate days to the next Saturday
  const calculateDaysToSaturday = () => {
    const today = new Date();
    const currentDayIndex = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const saturdayIndex = 6; // Saturday is at index 6
    const daysUntilSaturday = currentDayIndex === saturdayIndex ? 7 : (saturdayIndex - currentDayIndex + 7) % 7;
    return daysUntilSaturday;
  };

  // Show alert on mount and hide after 5 seconds
  useEffect(() => {
    setDaysToSaturday(calculateDaysToSaturday());
    setShowAlert(true);
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000);
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  return (
    <>
      {/* Alert Popup */}
      {showAlert && (
        <div className="navbar-alert-popup">
          {daysToSaturday === 0
            ? "Today is Saturday!"
            : daysToSaturday === 1
            ? "Tomorrow is Saturday!"
            : `${daysToSaturday} days until Saturday`}
        </div>
      )}

      <nav className="navbar-container">
        {/* Brand/Logo placeholder */}
        <div className="navbar-brand">
          <span className="navbar-brand-text">EcoCollect</span>
        </div>

        {/* Navigation links container */}
        <div className="navbar-links-container">
          <div className="navbar-links-inner">
            <Link to="/stats" className="navbar-link">
              <BarChart size={20} className="navbar-link-icon" />
              Submit
            </Link>
            <Link to="/summ" className="navbar-link">
              <Map size={20} className="navbar-link-icon" />
              Statistics
            </Link>
            <Link to="/search" className="navbar-link">
              <Search size={20} className="navbar-link-icon" />
              Search Location
            </Link>
            <Link to="/find" className="navbar-link">
              <MapPin size={20} className="navbar-link-icon" />
              Current Collections
            </Link>
            <Link to="/profile" className="navbar-link">
              <User size={20} className="navbar-link-icon" />
              Profile
            </Link>
            <Link to="/logout" className="navbar-logout-link">
              <LogOut size={20} className="navbar-logout-icon" />
              Logout
            </Link>
          </div>
        </div>
      </nav>
      <EwasteOverviewContent />
    </>
  );
}

export default NavBar;