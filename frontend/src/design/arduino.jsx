import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import './arduino.css';

function ArduinoData() {
    const [arduinoData, setArduinoData] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArduinoData = async () => {
            try {
                const response = await fetch("https://envprj.onrender.com/api/getarduino");
                if (!response.ok) {
                    throw new Error("Failed to fetch Arduino data");
                }
                const data = await response.json();
                setArduinoData(data);
                setError("");
            } catch (err) {
                console.error("Error fetching Arduino data:", err);
                setError("Error fetching data from the server. Please try again.");
            }
        };
        fetchArduinoData();
    }, []);

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString("en-US", {
            timeZone: "Africa/Nairobi",
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    };

    return (
        <div className="arduino-data-main-container">
            <div className="arduino-data-card">
                <button
                    onClick={() => navigate('/navbaradd')}
                    className="arduino-data-back-button"
                    aria-label="Go back"
                >
                    <ArrowLeft size={20} />
                </button>

                <h2 className="arduino-data-title">Arduino Data</h2>

                {error && (
                    <p className="arduino-data-message-error">{error}</p>
                )}

                {arduinoData.length === 0 && !error ? (
                    <p className="arduino-data-message">No data available.</p>
                ) : (
                    <div className="arduino-data-table-container">
                        <table className="arduino-data-table">
                            <thead>
                                <tr>
                                    <th>Device ID</th>
                                    <th>Distance</th>
                                    <th>Status</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arduinoData.map((record) => (
                                    <tr key={record._id}>
                                        <td>{record.deviceId}</td>
                                        <td>{record.distance}</td>
                                        <td>{record.status}</td>
                                        <td>{formatTimestamp(record.timestamp)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ArduinoData;