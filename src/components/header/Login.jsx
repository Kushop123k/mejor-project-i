import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './Login.css';
import backgroundImage from './hotel-bg.jpg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to store login error messages

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(''); // Reset error messages

        try {
            const response = await axios.post('https://your-api-url.com/login', {
                email: email,
                password: password
            });
            console.log('Login success:', response.data);
            // Handle response, e.g., save token, navigate to another page
        } catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(err.response.data.message);
            } else {
                // Something happened in setting up the request that triggered an Error
                setError('Login failed. Please try again later.');
            }
        }
    };

    return (
        <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login to Your Account</h2>
                {error && <p className="error">{error}</p>}
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
                <p className="register-link">
                    Don't have an account? <a href="/register">Create an account</a>
                </p>
            </form>
        </div>
    );
}

export default Login;
