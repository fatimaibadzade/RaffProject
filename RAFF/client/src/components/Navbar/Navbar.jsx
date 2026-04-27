import { Link } from "react-router-dom";
import "./Navbar.css";
import { useStore } from "../../context/StoreContext";

function Navbar() {
  const { cart, wishlist, currentUser, logout } = useStore();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <div className="top-line">
        <span>01</span>
        <span>RAPNATION</span>
        <span>{currentUser ? currentUser.email : "GUEST"}</span>
      </div>
      <nav className="nav-links">
        <Link to="/">NEW DROP</Link>
        <Link to="/shop">SHOP</Link>
        <Link to="/wishlist">WISHLIST ({wishlist.length})</Link>
        <Link to="/cart">CART ({cartCount})</Link>
      </nav>
      <nav className="auth-links">
        <Link to="/login">LOGIN</Link>
        <Link to="/register">REGISTER</Link>
        <button onClick={logout} type="button">
          LOGOUT
        </button>
      </nav>
    </header>
  );
}

export default Navbar;