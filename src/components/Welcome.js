import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Welcome.css';
import backgroundImage from '../components/header/hotel-bg.jpg';

const WelcomePage = () => {
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOptions(true);
        }, 3000);  // Delays the sign in/up options for 3 seconds

        return () => clearTimeout(timer);
    }, []);

    const renderColoredWelcome = () => {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8F33', '#33FFF7', '#A833FF'];
        const welcomeText = 'Welcome';
        return welcomeText.split('').map((char, index) => (
            <span key={index} className="drop-in" style={{ color: colors[index % colors.length], animationDelay: `${index * 0.2}s` }}>{char}</span>
        ));
    };

    return (
        <div className="welcome-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="overlay">
                <h1 className="welcome-title">{renderColoredWelcome()}</h1>
                <h3 className="welcome-subtitle fade-in">Sign in or Sign up to Continue</h3>
                {showOptions && (
                    <div className="options-container fade-in-options">
                        <button className="option-button" onClick={() => navigate('/login')}>Sign In</button>
                        <button className="option-button" onClick={() => navigate('/register')}>Sign Up</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WelcomePage;
