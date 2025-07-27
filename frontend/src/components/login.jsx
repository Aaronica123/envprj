import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./profile";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const storedUsername = sessionStorage.getItem("username");
    if (storedIsLoggedIn && storedUsername) {
      setIsLoggedIn(true);
    }
    console.log("Initial state - isLoggedIn:", storedIsLoggedIn, "username in sessionStorage:", storedUsername); // Debug
  }, []);

  const handleLogin = async () => {
    if (!username.trim()) {
      alert("Username is required");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/check", {
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
        alert(`Login successful: ${data.message}`);
        setUsername("");
        setPassword("");
        navigate("/navbar");
      } else {
        alert(`Login failed: ${data.message}`);
        setIsLoggedIn(false);
        setLoggedInUsername("");
      }
    } catch (error) {
      console.log("done");
      alert("Error during Login");
      setIsLoggedIn(false);
      setLoggedInUsername("");
    }
  };

  useEffect(() => {
    console.log("Logged in username:", loggedInUsername);
  }, [loggedInUsername]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-field"
        />
        <button onClick={handleLogin} className="signin-button">
          Sign In
        </button>
        <Link to="/register">
          <button className="register-button">Go to Register</button>
        </Link>
        {isLoggedIn && loggedInUsername && (
          <div className="profile-section">
            <Profile username={loggedInUsername} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;