import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useUi } from "../../context/UiContext";

function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
  const { t } = useUi();
  return (
    <div className="product-card">
      <div className="product-media">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <button
          className={`wishlist-heart ${isWishlisted ? "active" : ""}`}
          onClick={() => onToggleWishlist?.(product.id)}
          aria-label="Toggle wishlist"
          type="button"
        >
          ♥
        </button>
      </div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <div className="card-actions">
        <button onClick={() => onAddToCart?.(product.id)}>{t("product.addToCart")}</button>
      </div>
    </div>
  );
}

export default ProductCard;