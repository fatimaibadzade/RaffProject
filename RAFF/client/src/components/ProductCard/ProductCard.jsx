import "./ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
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
        <button onClick={() => onAddToCart?.(product.id)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;