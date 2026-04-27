function Product() {
    return (
      <section className="container" style={{ padding: "60px 0" }}>
        <div style={{ display: "flex", gap: "40px" }}>
          <img
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
            alt="product"
            style={{ width: "400px", objectFit: "cover" }}
          />
  
          <div>
            <h1>Black Hoodie</h1>
            <p style={{ margin: "20px 0" }}>$90</p>
            <p>
              Premium streetwear hoodie inspired by music, fashion and city life.
            </p>
  
            <button style={{ marginTop: "20px" }}>
              Add To Cart
            </button>
          </div>
        </div>
      </section>
    );
  }
  
  export default Product;