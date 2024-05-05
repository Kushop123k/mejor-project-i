import React, { useState } from 'react';
import './ManageHotels.css'; // Make sure to create this CSS file

const hotelsMock = [
  { id: 1, name: "Hotel Sunset", location: "California" },
  { id: 2, name: "Ocean View", location: "Florida" }
];

const ManageHotels = () => {
  const [hotels, setHotels] = useState(hotelsMock);
  const [newHotel, setNewHotel] = useState({ name: '', location: '' });

  const deleteHotel = (id) => {
    setHotels(hotels.filter(hotel => hotel.id !== id));
  };

  const addHotel = (e) => {
    e.preventDefault();
    const id = hotels.length + 1;
    setHotels([...hotels, { ...newHotel, id }]);
    setNewHotel({ name: '', location: '' }); // Reset form after submission
  };

  return (
    <div className="container mt-5">
      <h2>Manage Hotels</h2>
      <div className="list-group">
        {hotels.map(hotel => (
          <div key={hotel.id} className="list-group-item">
            {hotel.name} ({hotel.location})
            <button className="btn btn-danger float-right" onClick={() => deleteHotel(hotel.id)}>Delete</button>
          </div>
        ))}
      </div>
      <form onSubmit={addHotel} className="mt-4">
        <input 
          type="text"
          className="form-control mb-2"
          placeholder="Hotel Name"
          value={newHotel.name}
          onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
          required
        />
        <input 
          type="text"
          className="form-control mb-2"
          placeholder="Location"
          value={newHotel.location}
          onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-primary">Add Hotel</button>
      </form>
    </div>
  );
};

export default ManageHotels;
