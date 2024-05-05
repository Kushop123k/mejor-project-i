import React, { useState } from 'react';
import './Login.css';
import backgroundImage from './hotel-bg.jpg'; // Path to your image
import { addUser } from "../service/Api";

const initialValues = {
    name: '',
    email: '',
    phno: '',
    password: '',
    userType: 'normal' // Default to 'normal' user type
};

const Register = () => {
    const [user, setUser] = useState(initialValues);
    const [phoneValid, setPhoneValid] = useState(true);

    const onValueChange = (e) => {
        const { name, value } = e.target;
        if (name === "phno") {
            const cleaned = value.replace(/\D/g, ''); // Remove non-digits
            setUser({...user, phno: cleaned});
            setPhoneValid(cleaned.length === 10); // Validate phone number
        } else {
            setUser({...user, [name]: value});
        }
    };

    const addUserDetails = async () => {
        if (phoneValid) {
            await addUser(user);
            alert("User created successfully!"); // Show alert when user is successfully created
        } else {
            alert("Please correct the phone number."); // Alert if phone number is invalid
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        addUserDetails();
    };

    return (
        <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <form onSubmit={handleLogin} className="login-form">
                <h2>Create Your Account</h2>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    onChange={onValueChange}
                    name="name"
                    required
                />
                <label htmlFor="phno">Phone No:</label>
                <input
                    type="text"
                    id="phno"
                    value={user.phno}
                    onChange={onValueChange}
                    name="phno"
                    required
                />
                {!phoneValid && <div style={{ color: 'red' }}>Phone number must be exactly 10 digits.</div>}
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
               <div className="radio-group">
    <input
        type="radio"
        id="normal-user"
        value="normal"
        checked={user.userType === 'normal'}
        onChange={onValueChange}
        name="userType"
    />
    <label htmlFor="normal-user">Normal User</label>

    <input
        type="radio"
        id="admin-user"
        value="admin"
        checked={user.userType === 'admin'}
        onChange={onValueChange}
        name="userType"
    />
    <label htmlFor="admin-user">Admin</label>
</div>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default Register;
