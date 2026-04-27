import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="top-line">
        <span>01</span>
        <span>RAPNATION</span>
        <span>2026</span>
      </div>
      <nav className="nav-links">
        <Link to="/">NEW DROP</Link>
        <Link to="/shop">SHOP</Link>
        <Link to="/wishlist">WISHLIST</Link>
        <Link to="/cart">CART</Link>
      </nav>
    </header>
  );
}

export default Navbar;