import ProductCard from "../../components/ProductCard/ProductCard";

const shopProducts = [
  {
    id: 1,
    name: "Black Hoodie",
    price: 90,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
  },
  {
    id: 2,
    name: "White Tee",
    price: 55,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
  },
  {
    id: 3,
    name: "Cap",
    price: 35,
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee"
  }
];

function Shop() {
  return (
    <section className="container" style={{ padding: "60px 0" }}>
      <h1>Shop</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "30px"
        }}
      >
        {shopProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Shop;