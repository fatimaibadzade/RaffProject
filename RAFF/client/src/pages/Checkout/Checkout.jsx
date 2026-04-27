import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

function Checkout() {
  const navigate = useNavigate();
  const { cartItemsDetailed, cartTotal, clearCart } = useStore();
  const [form, setForm] = useState({ fullName: "", address: "", phone: "" });
  const [message, setMessage] = useState("");

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = () => {
    if (!form.fullName || !form.address || !form.phone) {
      setMessage("Please fill all fields.");
      return;
    }
    if (cartItemsDetailed.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }
    clearCart();
    setMessage("Payment successful. Thank you for your order!");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <section style={{ padding: "60px 20px" }}>
      <h1>Checkout</h1>
      <p style={{ marginBottom: "14px" }}>Total: ${cartTotal}</p>

      <input
        placeholder="Full Name"
        value={form.fullName}
        onChange={(e) => onChange("fullName", e.target.value)}
      />
      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) => onChange("address", e.target.value)}
      />
      <input
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => onChange("phone", e.target.value)}
      />

      <button style={{ marginTop: "20px" }} onClick={onSubmit}>
        Pay Now
      </button>
      {message ? <p style={{ marginTop: "10px" }}>{message}</p> : null}
    </section>
  );
}

export default Checkout;