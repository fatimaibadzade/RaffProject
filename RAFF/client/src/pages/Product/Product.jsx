import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

function Product() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { products, addToCart, toggleWishlist, wishlist } = useStore();

  const requestedId = Number(id ?? searchParams.get("id") ?? products[0]?.id);
  const product = useMemo(
    () => products.find((item) => item.id === requestedId) ?? products[0],
    [products, requestedId]
  );

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);

  return (
    <section className="container" style={{ padding: "60px 0" }}>
      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "400px", maxWidth: "100%", objectFit: "cover" }}
        />

        <div>
          <h1>{product.name}</h1>
          <p style={{ margin: "20px 0" }}>${product.price}</p>
          <p>{product.description}</p>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button onClick={() => addToCart(product.id)}>Add To Cart</button>
            <button onClick={() => toggleWishlist(product.id)}>
              {isWishlisted ? "♥ In Wishlist" : "♡ Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;