import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./profile"; // Assuming Profile component exists and is correctly located
import { ArrowLeft } from 'lucide-react'; // Import the back arrow icon

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [loginMessage, setLoginMessage] = useState(""); // New state for login messages
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const storedUsername = sessionStorage.getItem("username");
    if (storedIsLoggedIn && storedUsername) {
      setIsLoggedIn(true);
      setLoggedInUsername(storedUsername); // Set the username from session storage
    }
    console.log("Initial state - isLoggedIn:", storedIsLoggedIn, "username in sessionStorage:", storedUsername); // Debug
  }, []);

  const handleLogin = async () => {
    setLoginMessage(""); // Clear previous messages
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
        navigate("/navbar"); // Redirect on successful login
      } else {
        setLoginMessage(`Login failed: ${data.message || "Invalid credentials."}`);
        setIsLoggedIn(false);
        setLoggedInUsername("");
      }
    } catch (error) {
      console.error("Error during Login:", error); // Log the actual error
      setLoginMessage("Error connecting to the server. Please try again.");
      setIsLoggedIn(false);
      setLoggedInUsername("");
    }
  };

  // This useEffect is likely for debugging, keep it if still needed
  useEffect(() => {
    console.log("Logged in username state updated:", loggedInUsername);
  }, [loggedInUsername]);

  return (
    // Main container with full-screen background (reusing previous theme's background)
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1594732675975-d9c0a64b9c1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQ4NzF8MHwxfHNlYXJjaHwxfHxlLXdhc3RlJTIwcmVjeWNsaW5nfGVufDB8fHx8MTY5MDExMDc3MXww&ixlib=rb-4.0.3&q=80&w=1080')",
      }}
    >
      {/* Login Card Container */}
      <div className="p-8 max-w-sm w-full mx-auto my-10 shadow-xl rounded-2xl bg-white bg-opacity-90 border border-gray-200 text-center transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl relative">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 p-2 bg-gray-500 text-white rounded-full shadow-md transition duration-300 ease-in-out hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        <h2 className="text-4xl font-extrabold text-[#2e7d32] mb-8 mt-4 tracking-tight">
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
            className="input-field w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4caf50] focus:border-[#4caf50] text-lg"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-field w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4caf50] focus:border-[#4caf50] text-lg"
          />
        </div>

        <button onClick={handleLogin} className="signin-button w-full py-3 px-6 bg-[#4caf50] text-white font-semibold text-lg rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#388e3c] hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed">
          Sign In
        </button>

        <Link to="/register" className="block mt-4">
          <button className="register-button w-full py-3 px-6 bg-gray-600 text-white font-semibold text-lg rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-700 hover:scale-105 active:scale-100">
            Go to Register
          </button>
        </Link>
        
        {isLoggedIn && loggedInUsername && (
          <div className="profile-section mt-6 pt-4 border-t border-dashed border-gray-300">
            {/* Assuming Profile component correctly uses username prop */}
            <Profile username={loggedInUsername} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;