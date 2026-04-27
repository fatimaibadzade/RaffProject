import Hero from "../../sections/Hero/Hero";
import ProductCard from "../../components/ProductCard/ProductCard";

const products = [
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
  }
];

function Home() {
  return (
    <>
      <Hero />

      <section style={{ padding: "60px 40px" }}>
        <h2>NEW DROP</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginTop: "20px" }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;