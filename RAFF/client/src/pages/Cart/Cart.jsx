import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

function Cart() {
  const navigate = useNavigate();
  const { cartItemsDetailed, updateQuantity, removeFromCart, cartTotal } = useStore();

  return (
    <section style={{ padding: "60px 20px" }}>
      <h1>Your Cart</h1>

      {cartItemsDetailed.length === 0 ? (
        <p>Your selected products will appear here.</p>
      ) : (
        <>
          {cartItemsDetailed.map(({ product, quantity }) => (
            <div
              key={product.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                padding: "12px 0"
              }}
            >
              <span style={{ minWidth: "130px", textAlign: "left" }}>{product.name}</span>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <button onClick={() => updateQuantity(product.id, quantity - 1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
              </div>
              <span>${product.price * quantity}</span>
              <button onClick={() => removeFromCart(product.id)}>Remove</button>
            </div>
          ))}

          <p style={{ marginTop: "16px", fontWeight: 700 }}>Total: ${cartTotal}</p>
        </>
      )}

      <button
        onClick={() => navigate("/checkout")}
        disabled={cartItemsDetailed.length === 0}
        style={{ marginTop: "20px" }}
      >
        Go To Checkout
      </button>
    </section>
  );
}

export default Cart;