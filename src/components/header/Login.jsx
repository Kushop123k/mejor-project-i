import React, { useState } from 'react';
import './Login.css';
import backgroundImage from './hotel-bg.jpg'; // Path to your image
//import {  useAuth } from '../'
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        console.log('Logging in with:', email, password);
    };

    return (
       <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
           
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login to Your Account</h2>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
