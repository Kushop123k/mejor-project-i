import React, { useState } from 'react';
import '../components/navbar/AdminPage.css';
import AddHotel from './navbar/AddHotel';
import ManageBookings from './ManageBookings';
import ManageUsers from './ManageUsers';

const AdminPage = () => {
  const [view, setView] = useState('hotels');

  const getButtonClass = (buttonView) => {
    return `btn ${view === buttonView ? 'active' : ''}`;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-content">
        <h1 className="admin-header" text-align="center">Admin Dashboard</h1>
        <div className="admin-nav">
         
          <button type="button" className={getButtonClass('bookings')} onClick={() => setView('bookings')}>Manage Bookings</button>
          <button type="button" className={getButtonClass('hotels')} onClick={() => setView('hotels')}>AddHotel</button>
          <button type="button" className={getButtonClass('users')} onClick={() => setView('users')}>Manage Users</button>
        </div>
        <div className="admin-section">
          {view === 'hotels' && <AddHotel />}
          {view === 'bookings' && <ManageBookings />}
          {view === 'users' && <ManageUsers />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
