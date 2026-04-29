import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { useUi } from "../../context/UiContext";

function Checkout() {
  const navigate = useNavigate();
  const { cartItemsDetailed, cartTotal, clearCart } = useStore();
  const { t } = useUi();
  const [form, setForm] = useState({ fullName: "", address: "", phone: "" });
  const [message, setMessage] = useState("");

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = () => {
    if (!form.fullName || !form.address || !form.phone) {
      setMessage(t("checkout.error.fillAll"));
      return;
    }
    if (cartItemsDetailed.length === 0) {
      setMessage(t("checkout.error.cartEmpty"));
      return;
    }
    clearCart();
    setMessage(t("checkout.success"));
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <section style={{ padding: "60px 20px" }}>
      <h1>{t("checkout.h1")}</h1>
      <p style={{ marginBottom: "14px" }}>{t("checkout.total", { total: cartTotal })}</p>

      <input
        placeholder={t("checkout.fullName")}
        value={form.fullName}
        onChange={(e) => onChange("fullName", e.target.value)}
      />
      <input
        placeholder={t("checkout.address")}
        value={form.address}
        onChange={(e) => onChange("address", e.target.value)}
      />
      <input
        placeholder={t("checkout.phone")}
        value={form.phone}
        onChange={(e) => onChange("phone", e.target.value)}
      />

      <button style={{ marginTop: "20px" }} onClick={onSubmit}>
        {t("checkout.payNow")}
      </button>
      {message ? <p style={{ marginTop: "10px" }}>{message}</p> : null}
    </section>
  );
}

export default Checkout;