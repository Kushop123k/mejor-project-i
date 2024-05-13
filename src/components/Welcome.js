import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Welcome.css';
import backgroundImage from '../components/header/hotel-bg.jpg'
const WelcomePage = () => {
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();

    useEffect(() => { 
        const timer = setTimeout(() => {
            setShowOptions(true);
        }, 3000);  // Delays the sign in/up options for 3 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="welcome-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h3 className="fade-in">Welcome to Hotel Singin or Sing up to Continue !!!</h3>
             {showOptions && (
                <div className="options-container">
                    <button onClick={() => navigate('/login')}>Sign In</button>
                    <button onClick={() => navigate('/register')}>Sign Up</button>
                </div>
            )}
        </div>
    );
};

export default WelcomePage;
