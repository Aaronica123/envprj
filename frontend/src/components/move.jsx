import React from "react";
import { useNavigate } from "react-router-dom";
import { User, UserPlus, Users, ArrowLeft } from 'lucide-react'; // Added ArrowLeft for back button
import "./move.css"; // Import the CSS file

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="dashboard-main-container">
            {/* Dashboard Card Container */}
            <div className="dashboard-card">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/navbaradd')}
                    className="dashboard-back-button"
                    aria-label="Go back"
                >
                    <ArrowLeft size={20} />
                </button>

                {/* Title */}
                <h2 className="dashboard-title">
                    Dashboard
                </h2>

                {/* Buttons */}
                <div className="dashboard-buttons-container">
                    {/* All Profiles Button */}
                    <button
                        onClick={() => navigate('/allprofile')}
                        className="dashboard-action-button"
                    >
                        <Users size={20} />
                        View All Profiles
                    </button>

                    {/* Admin Registration Button */}
                    <button
                        onClick={() => navigate('/regadmin')}
                        className="dashboard-action-button"
                    >
                        <UserPlus size={20} />
                        Admin Registration
                    </button>

                    {/* Staff Registration Button */}
                    <button
                        onClick={() => navigate('/staff')}
                        className="dashboard-action-button"
                    >
                        <UserPlus size={20} />
                        Staff Registration
                    </button>
                    <button
                        onClick={() => navigate('/statusdisplay')}
                        className="dashboard-action-button"
                    >
                        <UserPlus size={20} />
                        Error Check
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;