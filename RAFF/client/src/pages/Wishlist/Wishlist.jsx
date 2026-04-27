import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

function Wishlist() {
  const navigate = useNavigate();
  const { products, wishlist, toggleWishlist, addToCart } = useStore();
  const items = products.filter((product) => wishlist.includes(product.id));

  return (
    <section style={{ padding: "60px 20px" }}>
      <h1>Wishlist</h1>
      {items.length === 0 ? (
        <p>Your favorite saved products.</p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              padding: "12px 0"
            }}
          >
            <span>{item.name}</span>
            <div style={{ display: "flex", gap: "8px" }}>
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