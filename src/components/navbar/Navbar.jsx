import "./navbar.css"
import { useNavigate } from "react-router-dom";
import AdminPage from "../AdminPage";
import Hotel from "../../pages/hotel/Hotel";


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Kushhotel</span>
        <div className="navItems">
          <button className="navButton" onClick={() => {
                                    navigate("/Register");
                                  }}
          >Register
                              
          </button>
          <button className="navButton" onClick={() => {
                                    navigate("/Add-Hotel");
                                  }}
          >AddHotel
                              
          </button>
        
          <button className="navButton" onClick={() => {
                                    navigate("/Admin");
                                  }}
          >Admin pg
                              
          </button>
          
    

          <button className="navButton"
          onClick={() => {
            navigate("/Login");
          }}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar