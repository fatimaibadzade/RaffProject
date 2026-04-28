import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useStore } from "../../context/StoreContext";
import BrandLogo from "../BrandLogo/BrandLogo";

function Navbar() {
  const { cart, wishlist, currentUser, logout } = useStore();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const displayName = currentUser?.fullName || currentUser?.email || "Guest";

  return (
    <header className="navbar">
      <div className="top-line">
        <span>Curated streetwear store</span>
        <span>{currentUser ? `Signed in as ${displayName}` : "Secure account access"}</span>
      </div>

      <div className="navbar-main">
        <Link to="/" className="brand-block">
          <BrandLogo compact />
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/wishlist">
            Wishlist <span className="count-badge">{wishlist.length}</span>
          </NavLink>
          <NavLink to="/cart">
            Cart <span className="count-badge">{cartCount}</span>
          </NavLink>
        </nav>

        <nav className="auth-links">
          {currentUser ? (
            <>
              <div className="auth-user">
                <span className="auth-user__label">Account</span>
                <strong>{displayName}</strong>
              </div>
              <button onClick={logout} type="button" className="auth-pill auth-pill--dark">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-pill">
                Sign in
              </Link>
              <Link to="/register" className="auth-pill auth-pill--dark">
                Create account
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;