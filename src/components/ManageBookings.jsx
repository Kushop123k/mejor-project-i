import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import bootstrap CSS
import './ManageBookings.css'; // Import custom CSS for additional styling

const bookingsMock = [
  { id: 1, hotelName: "Hotel Sunset", guest: "John Doe", status: "Pending" },
  { id: 2, hotelName: "Ocean View", guest: "Jane Doe", status: "Pending" }
];

const ManageBookings = () => {
  const [bookings, setBookings] = useState(bookingsMock);

  const deleteBooking = (id) => {
    setBookings(bookings.filter(booking => booking.id !== id));
  };

  const acceptBooking = (id) => {
    setBookings(bookings.map(booking => booking.id === id ? {...booking, status: "Accepted"} : booking));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Manage Bookings</h2>
      <div className="list-group">
        {bookings.map(booking => (
          <div key={booking.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
              {booking.hotelName} - Guest: {booking.guest} - Status: {booking.status}
            </div>
            <div>
              {booking.status === "Pending" && (
                <button className="btn btn-success me-2" onClick={() => acceptBooking(booking.id)}>Accept</button>
              )}
              <button className="btn btn-danger" onClick={() => deleteBooking(booking.id)}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBookings;
