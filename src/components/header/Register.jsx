import React, { useState } from 'react';
import './Login.css';
import backgroundImage from './hotel-bg.jpg'; // Path to your image
import { addUser } from "../service/Api";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
    name: '',
    email: '',
    phno: '',
    password: '',
    type: 'normal' // Default to 'normal' user type
};

const Register = () => {
    const [user, setUser] = useState(initialValues);
    const [phoneValid, setPhoneValid] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const onValueChange = (e) => {
        const { name, value } = e.target;
        if (name === "phno") {
            const cleaned = value.replace(/\D/g, ''); // Remove non-digits
            setUser({ ...user, phno: cleaned });
            setPhoneValid(cleaned.length === 10); // Validate phone number
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    const addUserDetails = async () => {
        if (phoneValid) {
            try {
                await addUser(user);
                toast.success("User created successfully!");
                setTimeout(() => {
                    navigate('/login'); // Navigate to home page after successful registration
                }, 2000); // Delay for 2 seconds before navigating
            } catch (error) {
                setError("Failed to create user. Please try again.");
            }
        } else {
            setError("Please correct the phone number.");
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        addUserDetails();
    };

    return (
        <div className="login-container" style={{ backgroundImage: `url(${backgroundImage}) `}}>
            <form onSubmit={handleLogin} className="login-form">
                <h2>Create Your Account</h2>
                {error && <div className="error-box">{error}</div>}
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    onChange={onValueChange}
                    name="name"
                    required
                />
                <br /><br />
                <label htmlFor="phno">Phone No:</label>
                <input
                    type="text"
                    id="phno"
                    value={user.phno}
                    onChange={onValueChange}
                    name="phno"
                    required
                />
                <br /><br />
                {!phoneValid && <div className="error-box">Phone number must be exactly 10 digits.</div>}
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    onChange={onValueChange}
                    name="email"
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={onValueChange}
                    name="password"
                    required
                />
                <br /><br />
                <div className="radio-group">
                    <input
                        type="radio"
                        id="normal-user"
                        value="normal"
                        checked={user.type === 'normal'}
                        onChange={onValueChange}
                        name="type"
                    />
                    <label htmlFor="normal-user">Normal User</label>

                    <input
                        type="radio"
                        id="admin-user"
                        value="admin"
                        checked={user.type === 'admin'}
                        onChange={onValueChange}
                        name="type"
                    />
                    <label htmlFor="admin-user">Admin</label>
                </div>
                <button type="submit">Add User</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Register;