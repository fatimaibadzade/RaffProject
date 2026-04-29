import ProductCard from "../../components/ProductCard/ProductCard";
import { useStore } from "../../context/StoreContext";
import { useUi } from "../../context/UiContext";

function Shop() {
  const { products, addToCart, toggleWishlist, wishlist } = useStore();
  const { t } = useUi();

  return (
    <section className="container" style={{ padding: "60px 0" }}>
      <h1>{t("shop.h1")}</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "30px"
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            isWishlisted={wishlist.includes(product.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default Shop;