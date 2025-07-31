import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import './delet.css';

function DeleteRecords() {
    const [userId, setUserId] = useState("");
    const [adminId, setAdminId] = useState("");
    const [staffId, setStaffId] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [adminMessage, setAdminMessage] = useState("");
    const [staffMessage, setStaffMessage] = useState("");
    const [isSubmittingUser, setIsSubmittingUser] = useState(false);
    const [isSubmittingAdmin, setIsSubmittingAdmin] = useState(false);
    const [isSubmittingStaff, setIsSubmittingStaff] = useState(false);
    const navigate = useNavigate();

    const handleIdChange = (setter) => (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setter(value);
        }
    };

    const handleDelete = async (type, id, setMessage, setIsSubmitting, setId) => {
        setMessage("");
        setIsSubmitting(true);

        if (!id) {
            setMessage("Enter id");
            setIsSubmitting(false);
            return;
        }

        if (!/^\d{6,8}$/.test(id)) {
            setMessage("ID must be 6 to 8 digits.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/${type}del`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await response.json();

            if (response.status === 200) {
                setMessage(`Record deleted successfully: ${data.message}`);
                setId("");
            } else {
                setMessage(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error(`Error during ${type} deletion:`, error);
            setMessage("Error connecting to the server. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="delete-records-main-container">
            <div className="delete-records-card">
                <button
                    onClick={() => navigate('/dash')}
                    className="delete-records-back-button"
                    aria-label="Go back"
                >
                    <ArrowLeft size={20} />
                </button>

                <h2 className="delete-records-title">
                    Delete Records
                </h2>

                <div className="delete-records-input-container">
                    {/* User Deletion */}
                    <div className="delete-records-section">
                        <h3 className="delete-records-section-title">User Deletion</h3>
                        {userMessage && (
                            <p className={`delete-records-message ${userMessage.includes("successfully") ? "delete-records-message-success" : "delete-records-message-error"}`}>
                                {userMessage}
                            </p>
                        )}
                        <input
                            type="text"
                            value={userId}
                            onChange={handleIdChange(setUserId)}
                            placeholder="User ID (Numbers Only)"
                            className="delete-records-input"
                            pattern="\d*"
                        />
                        <button
                            onClick={() => handleDelete("user", userId, setUserMessage, setIsSubmittingUser, setUserId)}
                            disabled={isSubmittingUser}
                            className="delete-records-button"
                        >
                            {isSubmittingUser ? 'Deleting...' : 'Delete User'}
                        </button>
                    </div>

                    {/* Admin Deletion */}
                    <div className="delete-records-section">
                        <h3 className="delete-records-section-title">Admin Deletion</h3>
                        {adminMessage && (
                            <p className={`delete-records-message ${adminMessage.includes("successfully") ? "delete-records-message-success" : "delete-records-message-error"}`}>
                                {adminMessage}
                            </p>
                        )}
                        <input
                            type="text"
                            value={adminId}
                            onChange={handleIdChange(setAdminId)}
                            placeholder="Admin ID (Numbers Only)"
                            className="delete-records-input"
                            pattern="\d*"
                        />
                        <button
                            onClick={() => handleDelete("admin", adminId, setAdminMessage, setIsSubmittingAdmin, setAdminId)}
                            disabled={isSubmittingAdmin}
                            className="delete-records-button"
                        >
                            {isSubmittingAdmin ? 'Deleting...' : 'Delete Admin'}
                        </button>
                    </div>

                    {/* Staff Deletion */}
                    <div className="delete-records-section">
                        <h3 className="delete-records-section-title">Staff Deletion</h3>
                        {staffMessage && (
                            <p className={`delete-records-message ${staffMessage.includes("successfully") ? "delete-records-message-success" : "delete-records-message-error"}`}>
                                {staffMessage}
                            </p>
                        )}
                        <input
                            type="text"
                            value={staffId}
                            onChange={handleIdChange(setStaffId)}
                            placeholder="Staff ID (Numbers Only)"
                            className="delete-records-input"
                            pattern="\d*"
                        />
                        <button
                            onClick={() => handleDelete("staff", staffId, setStaffMessage, setIsSubmittingStaff, setStaffId)}
                            disabled={isSubmittingStaff}
                            className="delete-records-button"
                        >
                            {isSubmittingStaff ? 'Deleting...' : 'Delete Staff'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteRecords;