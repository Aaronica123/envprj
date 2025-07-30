import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react'; // Import the back arrow icon for visual consistency
import Staff from "./staff";
function NewRegister() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // State for displaying messages to the user
    const [isSubmitting, setIsSubmitting] = useState(false); // State for loading indicator
    const navigate = useNavigate();

    const handleNewRegister = async () => {
        setMessage(""); // Clear previous messages
        setIsSubmitting(true); // Set loading state

        if (!firstname.trim() || !lastname.trim() || !username.trim() || !password.trim()) {
            setMessage("All fields are required.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstname, lastname, username, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage(`Admin registration successful: ${data.message}`);
                setFirstname("");
                setLastname("");
                setUsername("");
                setPassword("");
                // Navigate to login page after successful registration
                // Navigate after 1.5 seconds
            } else {
                setMessage(`Admin registration failed: ${data.message || "Something went wrong."}`);
            }
        } catch (error) {
            console.error("Error during admin registration:", error);
            setMessage("Error connecting to the server. Please try again.");
        } finally {
            setIsSubmitting(false); // Reset loading state
        }
    };

    return (
        // Main container with full-screen background (reusing previous theme's background)
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1594732675975-d9c0a64b9c1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQ4NzF8MHwxfHNlYXJjaHwxfHxlLXdhc3RlJTIwcmVjeWNsaW5nfGVufDB8fHx8MTY5MDExMDc3MXww&ixlib=rb-4.0.3&q=80&w=1080')",
            }}
        >
            {/* Registration Card Container */}
            <div className="p-8 max-w-sm w-full mx-auto my-10 shadow-xl rounded-2xl bg-white bg-opacity-90 border border-gray-200 text-center transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl relative">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/navbaradd')} // Redirect to root (which is typically login)
                    className="absolute top-4 left-4 p-2 bg-gray-500 text-white rounded-full shadow-md transition duration-300 ease-in-out hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                    aria-label="Go back"
                >
                    <ArrowLeft size={20} />
                </button>

                {/* Title */}
                <h2 className="text-4xl font-extrabold text-[#2e7d32] mb-8 mt-4 tracking-tight">
                    Admin Registration
                </h2>

                {/* Message display */}
                {message && (
                    <p className={`mb-4 text-sm ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </p>
                )}

                {/* Input Fields */}
                <div className="space-y-4 mb-6">
                    <input
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        placeholder="First Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4caf50] focus:border-[#4caf50] text-lg"
                        required
                    />
                    <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Last Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4caf50] focus:border-[#4caf50] text-lg"
                        required
                    />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4caf50] focus:border-[#4caf50] text-lg"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4caf50] focus:border-[#4caf50] text-lg"
                        required
                    />
                </div>

                {/* Register Button */}
                <button
                    onClick={handleNewRegister}
                    disabled={isSubmitting} // Disable during submission
                    className="w-full py-3 px-6 bg-[#4caf50] text-white font-semibold text-lg rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#388e3c] hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Registering...' : 'Sign Up'} {/* Text changes when submitting */}
                </button>

                {/* Go to Login Link */}
                <Link to="/" className="block mt-4">
                    <button
                        className="w-full py-3 px-6 bg-gray-600 text-white font-semibold text-lg rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-700 hover:scale-105 active:scale-100"
                    >
                        Go to Login
                    </button>
                </Link>
            </div>
            <Staff/>
        </div>
    );
}

export default NewRegister;