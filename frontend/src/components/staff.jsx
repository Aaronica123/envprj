import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import './staff.css';

function Staff() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleIdChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setId(value);
        }
    };

    const handleNewRegister = async () => {
        setMessage("");
        setIsSubmitting(true);

        if (!firstname.trim() || !lastname.trim() || !username.trim() || !id.trim() || !password.trim()) {
            setMessage("All fields are required.");
            setIsSubmitting(false);
            return;
        }

        if (!/^[a-zA-Z]+$/.test(firstname)) {
            setMessage("First name must contain only letters.");
            setIsSubmitting(false);
            return;
        }

        if (!/^[a-zA-Z]+$/.test(lastname)) {
            setMessage("Last name must contain only letters.");
            setIsSubmitting(false);
            return;
        }

        if (id.length > 8 || id.length < 6) {
            setMessage("Check id length");
            setIsSubmitting(false);
            return;
        }

        if (password.length < 6 || password.length > 8) {
            setMessage("Password must be 6 to 8 characters long.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstname, lastname, username, id, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage(`Staff registration successful: ${data.message}`);
                setFirstname("");
                setLastname("");
                setUsername("");
                setId("");
                setPassword("");
                setTimeout(() => navigate("/dash"), 1500);
            } else {
                setMessage(`Staff registration failed: ${data.message || "Something went wrong."}`);
            }
        } catch (error) {
            console.error("Error during staff registration:", error);
            setMessage("Error connecting to the server. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="staff-main-container">
            <div className="staff-card">
                <button
                    onClick={() => navigate('/dash')}
                    className="staff-back-button"
                    aria-label="Go back"
                >
                    <ArrowLeft size={20} />
                </button>

                <h2 className="staff-title">
                    Staff Registration
                </h2>

                {message && (
                    <p className={`staff-message ${message.includes("successful") ? "staff-message-success" : "staff-message-error"}`}>
                        {message}
                    </p>
                )}

                <div className="staff-input-container">
                    <input
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        placeholder="First Name"
                        className="staff-input"
                        required
                    />
                    <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Last Name"
                        className="staff-input"
                        required
                    />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="staff-input"
                        required
                    />
                    <input
                        type="text"
                        value={id}
                        onChange={handleIdChange}
                        placeholder="ID (Numbers Only)"
                        className="staff-input"
                        required
                        pattern="\d*"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="staff-input"
                        required
                        minLength="6"
                        maxLength="8"
                    />
                </div>

                <button
                    onClick={handleNewRegister}
                    disabled={isSubmitting}
                    className="staff-button"
                >
                    {isSubmitting ? 'Registering...' : 'Sign Up'}
                </button>

                <Link to="/" className="staff-login-button-container">
                    <button className="staff-login-button">
                        Go to Login
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Staff;