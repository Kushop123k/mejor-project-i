import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Register from "./components/header/Register";
import Login from "./components/header/Login";
import AddHotel from "./components/navbar/AddHotel";
import AdminPage from "./components/AdminPage";
//import HotelManagement from "./components/HotelManagement";
import ManageBookings from "./components/ManageBookings";
import ManageHotels from "./components/ManageHotels";
import ManageUsers from "./components/ManageUsers";
import EditUser from "./components/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
<Route path="/hotel" element={<Hotel/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-hotel" element={<AddHotel />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/ManageBookings" element={<ManageBookings/>}/>
        <Route path="/ManageHotels" element={<ManageHotels/>}/>
        <Route path="/ManageUsers" element={<ManageUsers/>}/>
        <Route path="/edit/:id" element={<EditUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
