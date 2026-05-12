import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <nav className="navbar">
      <h2>TradingTom</h2>

      <ul>
        <li style={{ fontSize: '1.2rem', cursor: 'default' }}>🤖</li>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>

        {/* Dropdown Menu Implementation (Click to toggle) */}
        <li className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <span>More ▾</span>
          <ul className="dropdown-menu" style={{ display: dropdownOpen ? 'block' : 'none' }}>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/forum">Forum</Link></li>
            {user && <li><Link to="/widget-puzzle">Widget Puzzle</Link></li>}
          </ul>
        </li>

        {!user ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <>
            {isAdmin && <li><Link to="/admin">Admin Panel</Link></li>}
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;