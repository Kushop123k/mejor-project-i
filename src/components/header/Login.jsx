import React, { useState } from 'react';
import './Login.css'; // Custom CSS for additional styling
import backgroundImage from './hotel-bg.jpg';
import { login } from '../service/Api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('normal');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const data = await login(email, password, userType);
            navigate(userType === 'admin' ? '/admin-dashboard' : '/home');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again later.');
        }
    };

    return (
        <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="container py-1 h-1 w-100">
                <div className="row d-flex justify-content-center align-items-center h-1">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong">
                            <div className="card-body p-5">
                                <h3 className="mb-5 text-center">Sign in to your account</h3>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <form onSubmit={handleLogin}>
                                    <div className="form-outline mb-4">
                                        <input type="email" id="email" className="form-control form-control-lg"
                                               value={email} onChange={e => setEmail(e.target.value)} required />
                                        <label className="form-label" htmlFor="email">Email</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="password" id="password" className="form-control form-control-lg"
                                               value={password} onChange={e => setPassword(e.target.value)} required />
                                        <label className="form-label" htmlFor="password">Password</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="userType" id="normal-user"
                                               value="normal" checked={userType === 'normal'} onChange={() => setUserType('normal')} />
                                        <label className="form-check-label" htmlFor="normal-user">Normal User</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="userType" id="admin-user"
                                               value="admin" checked={userType === 'admin'} onChange={() => setUserType('admin')} />
                                        <label className="form-check-label" htmlFor="admin-user">Admin</label>
                                    </div>
                                    <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                                </form>
                                <hr className="my-4" />
                                <div className="text-center">
                                    <p>Don't have an account? <a href="/register">Register</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
