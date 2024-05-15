import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user token or any auth state here
    localStorage.removeItem("userToken");  // Example of clearing user token
    navigate("/");  // Redirect to the welcome page
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Kushhotel</span>
        <div className="navItems">
          <button className="navButton" onClick={() => navigate("/Register")}>
            Register
          </button>
          <button className="navButton" onClick={() => navigate("/AddToCart")}>
            Cart
          </button>
          <button className="navButton" onClick={() => navigate("/Admin")}>
            Admin pg
          </button>
          <button className="navButton" onClick={() => navigate("/Login")}>
            Login
          </button>
          <button className="navButton" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
