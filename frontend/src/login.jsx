
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(`Login successful: ${data.message}`);
        
         setUsername("");
      setPassword("");
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
        console.log("done")
      alert("Error during Login");
    }
  };

  return (
    <div>
      <h2>New User Registration</h2>
     
      <br />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br />
      <button onClick={handleLogin}>Sign Up</button>
      <br />
    
    </div>
  );
}

export default Login;
