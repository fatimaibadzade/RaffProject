import "./ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <div className="card-actions">
        <button onClick={() => onAddToCart?.(product.id)}>Add to Cart</button>
        <button onClick={() => onToggleWishlist?.(product.id)}>
          {isWishlisted ? "In Wishlist" : "Wishlist"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;