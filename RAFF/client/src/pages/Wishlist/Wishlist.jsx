import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import "./Wishlist.css";

function Wishlist() {
  const navigate = useNavigate();
  const { products, wishlist, toggleWishlist, addToCart } = useStore();
  const items = products.filter((product) => wishlist.includes(product.id));

  return (
    <section className="wishlist-page">
      <h1>Wishlist</h1>
      {items.length === 0 ? (
        <p className="wishlist-empty">Your favorite saved products.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="wishlist-item">
            <div className="wishlist-product">
              <img src={item.image} alt={item.name} />
              <div>
                <span className="wishlist-name">{item.name}</span>
                <p>${item.price}</p>
              </div>
            </div>
            <div className="wishlist-actions">
              <button onClick={() => navigate(`/product/${item.id}`)}>Open</button>
              <button onClick={() => addToCart(item.id)}>Add To Cart</button>
              <button onClick={() => toggleWishlist(item.id)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default Wishlist;