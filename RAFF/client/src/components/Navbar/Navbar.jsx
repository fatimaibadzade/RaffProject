import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">RAPNATION</div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}

export default Navbar;