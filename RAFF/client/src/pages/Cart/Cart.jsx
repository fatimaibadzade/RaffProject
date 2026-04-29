import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { useUi } from "../../context/UiContext";

function Cart() {
  const navigate = useNavigate();
  const { cartItemsDetailed, updateQuantity, removeFromCart, cartTotal } = useStore();
  const { t } = useUi();

  return (
    <section style={{ padding: "60px 20px" }}>
      <h1>{t("cart.h1")}</h1>

      {cartItemsDetailed.length === 0 ? (
        <p>{t("cart.empty")}</p>
      ) : (
        <>
          {cartItemsDetailed.map(({ product, quantity, size }) => (
            <div
              key={`${product.id}-${size}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                padding: "12px 0"
              }}
            >
              <span style={{ minWidth: "160px", textAlign: "left" }}>
                {product.name} <span style={{ opacity: 0.8, fontSize: 12 }}>({size.toUpperCase()})</span>
              </span>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <button onClick={() => updateQuantity(product.id, size, quantity - 1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => updateQuantity(product.id, size, quantity + 1)}>+</button>
              </div>
              <span>${product.price * quantity}</span>
              <button onClick={() => removeFromCart(product.id, size)}>{t("cart.remove")}</button>
            </div>
          ))}

          <p style={{ marginTop: "16px", fontWeight: 700 }}>{t("cart.total", { total: cartTotal })}</p>
        </>
      )}

      <button
        onClick={() => navigate("/checkout")}
        disabled={cartItemsDetailed.length === 0}
        style={{ marginTop: "20px" }}
      >
        {t("cart.goCheckout")}
      </button>
    </section>
  );
}

export default Cart;