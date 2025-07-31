import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart, Search, MapPin, User, LogOut } from 'lucide-react';
import EwasteOverviewContent from './EwasteOverviewContent';
import "./navbaradm.css"; // Import the CSS file

function NavBar1() {
  const [showAlert, setShowAlert] = useState(false);
  const [daysToSaturday, setDaysToSaturday] = useState(0);

  // Array of days from Sunday to Saturday
  // const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
        <div className="navbar1-alert-popup">
          {daysToSaturday === 0
            ? "Today is Saturday!"
            : daysToSaturday === 1
            ? "Tomorrow is Saturday!"
            : `${daysToSaturday} days until Saturday`}
        </div>
      )}

      <nav className="navbar1-container">
        {/* Brand/Logo placeholder */}
        <div className="navbar1-brand">
          <span className="navbar1-brand-text">EcoCollect</span>
        </div>

        {/* Navigation links container */}
        <div className="navbar1-links-container">
          <div className="navbar1-links-inner">
            <Link to="/views" className="navbar1-link">
              <BarChart size={20} className="navbar1-link-icon" />
              Statistics
            </Link>
            <Link to="/views1" className="navbar1-link">
              <Search size={20} className="navbar1-link-icon" />
              Analysis
            </Link>
            <Link to="/get" className="navbar1-link">
              <Search size={20} className="navbar1-link-icon" />
              Locations
            </Link>
            <Link to="/locke" className="navbar1-link">
              <MapPin size={20} className="navbar1-link-icon" />
              Add locations
            </Link>
            <Link to="/dash" className="navbar1-link">
              <User size={20} className="navbar1-link-icon" />
              Profile
            </Link>
             <Link to="/arduino" className="navbar1-link">
              <User size={20} className="navbar1-link-icon" />
              Arduino
            </Link>
            <Link to="/logout" className="navbar1-logout-link">
              <LogOut size={20} className="navbar1-logout-icon" />
              Logout
            </Link>
            
          </div>
        </div>
      </nav>
      {/* <EwasteOverviewContent /> */}
      <EwasteOverviewContent/>
    </>
  );
}

export default NavBar1;