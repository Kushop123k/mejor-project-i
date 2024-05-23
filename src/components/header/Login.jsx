import React, { useState } from 'react';
import './Login.css';
import backgroundImage from './hotel-bg.jpg'; // Ensure the path is correct
import { getUser, login } from '../service/Api';
import { useNavigate } from 'react-router-dom';

function Login({setUser}) {
    const [credentials, setCredentials] = useState({ email: '', password: '', userType: 'normal' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await login(credentials.email, credentials.password, credentials.userType);
            if (response !== - 1) {
                localStorage.setItem("userId",response)
                const {data:user}=await getUser(response)
                localStorage.setItem('userName',user.name)
                if (credentials.userType === 'admin') {
                    navigate('/AdminHome');
                } else {
                    navigate('/home');
                }
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError('Login failed. Please try again later.');
            }
        }
    };

    return (
        <div className="login-container" style={{ backgroundImage: `url(${backgroundImage}) `}}>
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login to Your Account</h2>
                {error && <div className="error-box">{error}</div>}
                
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                    <br /><br />
                <div className="radio-group">
                    <input
                        type="radio"
                        id="normal-user"
                        name="userType"
                        value="normal"
                        checked={credentials.userType === 'normal'}
                        onChange={handleChange}
                    />
                    
                    <label htmlFor="normal-user">Normal User</label>
                    
                    <input
                        type="radio"
                        id="admin-user"
                        name="userType"
                        value="admin"
                        checked={credentials.userType === 'admin'}
                        onChange={handleChange}
                    />
                    <label htmlFor="admin-user">Admin</label>
                </div>
                
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;