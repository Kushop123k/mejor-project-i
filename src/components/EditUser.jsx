import React, { useState, useEffect } from 'react';
import { FormGroup, InputLabel, Input, TextField, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import { getUser, editUser } from "../components/service/Api";
import { useParams, useNavigate } from "react-router-dom";
import backgroundImage from './header/hotel-bg.jpg'; // Make sure this path is correct

const Container = styled.div` // Change to div for full control
  height: 100vh; // Full viewport height
  width: 100vw; // Full viewport width
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: cover; // Ensure it covers the full background
  background-position: center; // Center the background image
  background-attachment: fixed; // Optional: Fix background during scroll
`;

const FormContainer = styled(FormGroup)`
  width: 50%;
  padding: 60px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background-color: rgba(255, 255, 255, 0.8); // Semi-transparent background
`;

const EditUser = () => {
    const [user, setUser] = useState({ name: '', email: '', phno: '', password: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = async () => {
            let response = await getUser(id);
            setUser(response.data);
        };
        getUserData();
    }, [id]);

    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const updateUserDetails = async () => {
        await editUser(user, id);
        navigate('/Admin'); // Navigate to view page or your desired route
    };

    return (
        <Container>
            <FormContainer>
                <Typography variant="h4" style={{ textAlign: 'center' }}>Edit User</Typography>
                <form>
                    <InputLabel htmlFor="name">Name:</InputLabel>
                    <Input id="name" onChange={onValueChange} name="name" value={user.name} fullWidth />
                    
                    <InputLabel htmlFor="phno">Phone No:</InputLabel>
                    <Input id="phno" onChange={onValueChange} name="phno" value={user.phno} fullWidth />
                    
                    <InputLabel htmlFor="email">Email:</InputLabel>
                    <Input id="email" onChange={onValueChange} name="email" value={user.email} type="email" fullWidth />
                    
                    <InputLabel htmlFor="password">Password:</InputLabel>
                    <Input id="password" onChange={onValueChange} name="password" value={user.password} type="password" fullWidth />
                    
                    <Button onClick={updateUserDetails} variant="contained" color="primary" fullWidth>
                        Update User
                        <nevigate />
                    </Button>
                </form>
            </FormContainer>
        </Container>
    );
};

export default EditUser;
