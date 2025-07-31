import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import './login.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const storedUsername = sessionStorage.getItem("username");
    if (storedIsLoggedIn && storedUsername) {
      setIsLoggedIn(true);
      setLoggedInUsername(storedUsername);
    }
    console.log("Initial state - isLoggedIn:", storedIsLoggedIn, "username in sessionStorage:", storedUsername);
  }, []);

  const handleLogin = async () => {
    setLoginMessage("");
    if (!username.trim()) {
      setLoginMessage("Username is required.");
      return;
    }
    if (!password.trim()) {
      setLoginMessage("Password is required.");
      return;
    }

    try {
      const response = await fetch("https://envprj.onrender.com/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", username);
        setLoggedInUsername(username);
        setIsLoggedIn(true);
        setLoginMessage(`Login successful: ${data.message}`);
        setUsername("");
        setPassword("");
        window.alert("Succesful Login")
        navigate("/navbar");
        
      } else {
        setLoginMessage(`Login failed: ${data.message || "Invalid credentials."}`);
        setIsLoggedIn(false);
        setLoggedInUsername("");
      }
    } catch (error) {
      console.error("Error during Login:", error);
      setLoginMessage("Error connecting to the server. Please try again.");
      setIsLoggedIn(false);
      setLoggedInUsername("");
    }
  };

  useEffect(() => {
    console.log("Logged in username state updated:", loggedInUsername);
  }, [loggedInUsername]);

  return (
    <div className="login-container">
      <div className="login-card">
        <button
          onClick={() => navigate('/')}
          className="login-back-button"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="login-title">
          User Login
        </h2>
        {loginMessage && (
          <p className={`mb-4 text-sm ${loginMessage.includes("successful") ? "text-green-600" : "text-red-600"}`}>
            {loginMessage}
          </p>
        )}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="login-input-field"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input-field"
          />
        </div>
        <button onClick={handleLogin} className="login-signin-button">
          Sign In
        </button>
        <Link to="/register" className="block mt-4">
          <button className="login-register-button">
            Go to Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;