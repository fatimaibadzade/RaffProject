import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { useUi } from "../../context/UiContext";
import "./Product.css";

const SIZES_ORDER = ["xs", "s", "m", "l"];

function resolveClosestSize(requestedSize, availableSizes) {
  const normalized = Array.isArray(availableSizes) ? Array.from(new Set(availableSizes)) : [];
  if (normalized.length === 0) return "m";
  if (normalized.includes(requestedSize)) return requestedSize;

  const safeRequested = requestedSize && SIZES_ORDER.includes(requestedSize) ? requestedSize : "m";
  const requestedIndex = SIZES_ORDER.indexOf(safeRequested);

  let best = normalized[0];
  let bestScore = Number.POSITIVE_INFINITY;

  for (const size of normalized) {
    const idx = SIZES_ORDER.indexOf(size);
    const score = Math.abs(idx - requestedIndex);
    if (score < bestScore) {
      bestScore = score;
      best = size;
    } else if (score === bestScore) {
      if (idx < SIZES_ORDER.indexOf(best)) best = size;
    }
  }
  return best;
}

function Product() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { products, addToCart, toggleWishlist, wishlist } = useStore();
  const { t } = useUi();

  const requestedId = Number(id ?? searchParams.get("id") ?? products[0]?.id);
  const product = useMemo(
    () => products.find((item) => item.id === requestedId) ?? products[0],
    [products, requestedId]
  );

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const availableSizes = Array.isArray(product.sizes) && product.sizes.length ? product.sizes : SIZES_ORDER;

  const [requestedSize, setRequestedSize] = useState("m");
  const mappedSize = resolveClosestSize(requestedSize, availableSizes);

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

          <div className="product-sizes" aria-label="Choose size">
            <div className="product-sizes__label">{t("product.size.label")}</div>
            <div className="product-sizes__grid">
              {SIZES_ORDER.map((size) => {
                const active = requestedSize === size;
                const isAvailable = availableSizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    className={`product-size-btn ${active ? "product-size-btn--active" : ""} ${
                      !isAvailable ? "product-size-btn--missing" : ""
                    }`}
                    onClick={() => setRequestedSize(size)}
                    aria-pressed={active}
                  >
                    {size.toUpperCase()}
                  </button>
                );
              })}
            </div>

            <div className="product-sizes__selected">
              {t("product.size.selected", { size: mappedSize.toUpperCase() })}
            </div>

            {requestedSize !== mappedSize ? (
              <div className="product-sizes__note">
                {t("product.size.closest", {
                  requested: requestedSize.toUpperCase(),
                  closest: mappedSize.toUpperCase()
                })}
              </div>
            ) : null}
          </div>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button onClick={() => addToCart(product.id, requestedSize)}>{t("product.addToCart")}</button>
            <button onClick={() => toggleWishlist(product.id)}>
              {isWishlisted ? t("product.wishlist.in") : t("product.wishlist.out")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;