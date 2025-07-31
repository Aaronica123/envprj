import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import './register.css';

function NewRegister() {
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

        if (password.length < 6 || password.length > 8) {
            setMessage("Password must be 6 to 8 characters long.");
            setIsSubmitting(false);
            return;
        }
         if(id.length>8||id.length<6){
             setMessage("Check id length");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("https://envprj.onrender.com/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstname, lastname, username, id, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage(`Registration successful: ${data.message}`);
                setFirstname("");
                setLastname("");
                setUsername("");
                setId("");
                setPassword("");
                setTimeout(() => navigate('/'), 1500);
            } else {
                setMessage(`Registration failed: ${data.message || "Something went wrong."}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setMessage("Error connecting to the server. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="new-register-main-container">
            <div className="new-register-card">
                <button
                    onClick={() => navigate('/')}
                    className="new-register-back-button"
                    aria-label="Go back"
                >
                    <ArrowLeft size={20} />
                </button>

                <h2 className="new-register-title">
                    New User Registration
                </h2>

                {message && (
                    <p className={`new-register-message ${message.includes("successful") ? "new-register-message-success" : "new-register-message-error"}`}>
                        {message}
                    </p>
                )}

                <div className="new-register-input-container">
                    <input
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        placeholder="First Name"
                        className="new-register-input"
                        required
                    />
                    <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Last Name"
                        className="new-register-input"
                        required
                    />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="new-register-input"
                        required
                    />
                    <input
                        type="text"
                        value={id}
                        onChange={handleIdChange}
                        placeholder="ID (Numbers Only)"
                        className="new-register-input"
                        required
                        pattern="\d*"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="new-register-input"
                        required
                        minLength="6"
                        maxLength="8"
                    />
                </div>

                <button
                    onClick={handleNewRegister}
                    disabled={isSubmitting}
                    className="new-register-button"
                >
                    {isSubmitting ? 'Registering...' : 'Sign Up'}
                </button>

                <Link to="/" >
                    <button className="new-register-login-button">
                        Go to Login
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default NewRegister;