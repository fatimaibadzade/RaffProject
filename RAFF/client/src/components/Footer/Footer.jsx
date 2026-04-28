import "./Footer.css";
import BrandLogo from "../BrandLogo/BrandLogo";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__intro">
        <BrandLogo />
        <p>
          A cleaner storefront for curated streetwear, account access, and a more
          premium shopping feel.
        </p>
      </div>

      <div className="footer-links">
        <div>
          <strong>Shop</strong>
          <span>New arrivals</span>
          <span>Best sellers</span>
          <span>Wishlist</span>
        </div>
        <div>
          <strong>Company</strong>
          <span>About</span>
          <span>Journal</span>
          <span>Contact</span>
        </div>
        <div>
          <strong>Support</strong>
          <span>Delivery</span>
          <span>Returns</span>
          <span>Account</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;