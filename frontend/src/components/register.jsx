import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './login.css'; // Assuming login.css also contains styles for the register page

function NewRegister() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleNewRegister = async () => {
        try {
            // Basic validation for username (you can add more for other fields)
            if (!username.trim() || !password.trim()) {
                // Using a custom message box instead of alert() as per guidelines
                // For simplicity, this example just uses console.error and returns.
                // In a real app, you'd render a visible message to the user.
                console.error("Username and password cannot be empty.");
                return;
            }

            const response = await fetch("https://envprj.onrender.com/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstname, lastname, username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                // Using a custom message box instead of alert()
                console.log(`Registration successful: ${data.message}`);
                setFirstname("");
                setLastname("");
                setUsername("");
                setPassword("");
                navigate("/"); // Navigate to login page after successful registration
            } else {
                // Using a custom message box instead of alert()
                console.error(`Registration failed: ${data.message}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            // Using a custom message box instead of alert()
            console.error("Error during registration");
        }
    };

    return (
        <div className="login-container"> {/* Reusing login-container for centering */}
            <div className="login-card"> {/* Reusing login-card for styling */}
                <h2 className="login-title">New User Registration</h2> {/* Reusing login-title */}
                <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="First Name"
                    className="input-field" // Applying input-field style
                />
                <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Last Name"
                    className="input-field" // Applying input-field style
                />
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="input-field" // Applying input-field style
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="input-field" // Applying input-field style
                />
                <button onClick={handleNewRegister} className="signin-button"> {/* Using signin-button for primary action */}
                    Sign Up
                </button>
                <Link to="/">
                    <button className="register-button"> {/* Using register-button for secondary action */}
                        Go to Login
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default NewRegister;
