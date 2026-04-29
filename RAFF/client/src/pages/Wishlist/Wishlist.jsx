import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { useUi } from "../../context/UiContext";
import "./Wishlist.css";

function Wishlist() {
  const navigate = useNavigate();
  const { products, wishlist, toggleWishlist, addToCart } = useStore();
  const { t } = useUi();
  const items = products.filter((product) => wishlist.includes(product.id));

  return (
    <section className="wishlist-page">
      <h1>{t("wishlist.h1")}</h1>
      {items.length === 0 ? (
        <p className="wishlist-empty">{t("wishlist.empty")}</p>
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
              <button onClick={() => navigate(`/product/${item.id}`)}>{t("wishlist.open")}</button>
              <button onClick={() => addToCart(item.id)}>{t("wishlist.addToCart")}</button>
              <button onClick={() => toggleWishlist(item.id)}>{t("wishlist.remove")}</button>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default Wishlist;