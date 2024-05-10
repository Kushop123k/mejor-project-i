import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css'; // Path to CSS file for animations

const Welcome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/login'); // change the route after the animation
        }, 3000); // Adjust time as needed, 3000ms = 3 seconds
    }, [navigate]);

    const message = "Welcome to Our Websit book your hotel at your range at first plz login or Sing up!!!!!!!!";
    
    const messageArray = message.split("").map((letter, index) => (
        <span key={index} style={{ '--i': index }}>{letter}</span>
    ));

    return (
        <div className="welcome-screen">
            <h1 className="colorful-text">
                {messageArray}
            </h1>
        </div>
    );
};

export default Welcome;
