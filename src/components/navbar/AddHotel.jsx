import React, { useState } from 'react';
import '../header/Login.css'; // Reusing the existing CSS
import backgroundImage from '../header/hotel-bg.jpg'; // Reusing the same background image
import { addHotel } from "../service/Api"; // Ensure you have this function in your API service

const initialValues = {
    hotel_name: '',
    description: '',
    room: '',
    price: '',
    location: '',
    amenities: [],
    
};

const AddHotel = () => {
    const [hotel, setHotel] = useState(initialValues);
    const [amenitiesOptions] = useState(["WiFi", "Pool", "Parking", "Spa", "Gym"]);

    const onValueChange = (e) => {
        const { name, value } = e.target;
        if (name === "amenities") {
            // Handle multiple checkbox selection
            if (e.target.checked) {
                setHotel({ ...hotel, amenities: [...hotel.amenities, value] });
            } else {
                setHotel({ ...hotel, amenities: hotel.amenities.filter(amenity => amenity !== value) });
            }
        } else if (name === "image") {
            setHotel({ ...hotel, image: e.target.files[0] });
        } else {
            setHotel({ ...hotel, [name]: value });
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
           const body={
                "hotelName": hotel.hotel_name,
                "location": hotel.location,
                "price": hotel.price,
                "room": hotel.room,
                "description": hotel.description,
                "isWifienabled": hotel.amenities.some((item)=>item==="Wifi"),
                "isPoll" : hotel.amenities.some((item)=>item==="Pool"),
                "isParking": hotel.amenities.some((item)=>item==="Parking"),
                "isSpaEnabled": hotel.amenities.some((item)=>item==="Spa"),
                "isGymEnabled": hotel.amenities.some((item)=>item==="Gym")
            }
            

            await addHotel(body); // You need to handle this function on your API service side
            alert("Hotel added successfully!");
        } catch (error) {
            console.error("Failed to add hotel:", error);
            alert("Failed to add hotel. Please try again.");
        }
    };

    return (
        <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <form onSubmit={handleFormSubmit} className="login-form" encType="multipart/form-data">
                <h2>Add New Hotel</h2>
                <label htmlFor="name">Hotel Name:</label>
                <input type="text" id="hotel_name" name="hotel_name" onChange={onValueChange} required />

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" onChange={onValueChange} required />

                <label htmlFor="room">Number of Rooms:</label>
                <input type="number" id="room" name="room" onChange={onValueChange} required />

                <label htmlFor="price">Price per Night:</label>
                <input type="text" id="price" name="price" onChange={onValueChange} required />

                <label htmlFor="location">Location:</label>
                <input type="text" id="location" name="location" onChange={onValueChange} required />

               
                <div className="amenities-container">
                    <label>Amenities:</label>
                    {amenitiesOptions.map((amenity, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                id={amenity}
                                name="amenities"
                                value={amenity}
                                onChange={onValueChange}
                            />
                            <label htmlFor={amenity}>{amenity}</label>
                        </div>
                    ))}
                </div>

                <button type="submit">Add Hotel</button>
            </form>
        </div>
    );
};

export default AddHotel;