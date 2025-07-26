
import React, { useState } from "react";
//import {  useNavigate } from "react-router-dom";

function NewRegister() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 

  const handleNewRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(`Registration successful: ${data.message}`);
        setFirstname("");
        setLastname("");
      setUsername("");
      setPassword("")
      } else {
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
        console.log("done")
      alert("Error during registration");
    }
  };

  return (
    <div>
      <h2>New User Registration</h2>
      <input
        type="text"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        placeholder="First Name"
      />
      <br />
      <input
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        placeholder="Last Name"
      />
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
      <button onClick={handleNewRegister}>Sign Up</button>
      <br />
     
    </div>
  );
}
 //<Link to="/">Back to Home</Link>
export default NewRegister;
