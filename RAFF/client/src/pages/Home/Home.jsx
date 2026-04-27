import "./Home.css";

const topProducts = [
  {
    id: 1,
    name: "MASK",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "CD",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "TEE",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "FEM",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
  }
];

const storyCards = [
  {
    id: 1,
    title: "Studio Process",
    image:
      "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "On Body",
    image:
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Street Mood",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80"
  }
];

function Home() {
  return (
    <main className="home">
      <section className="hero-block">
        <img
          src="https://images.unsplash.com/photo-1592878904946-b3cd9094a92d?auto=format&fit=crop&w=1200&q=80"
          alt="RAPNATION hero"
        />
        <div className="hero-overlay">
          <h1>RAPNATION</h1>
          <p>STREET CULTURE CAPSULE</p>
        </div>
      </section>

      <section className="product-row">
        {topProducts.map((product) => (
          <article key={product.id} className="mini-card">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
          </article>
        ))}
      </section>

      <section className="graffiti-section">
        <h2>NEW NEW</h2>
        <div className="tag-line">STYLE IN RAW FORM</div>
      </section>

      <section className="story-grid">
        {storyCards.map((item) => (
          <article key={item.id} className="story-card">
            <img src={item.image} alt={item.title} />
          </article>
        ))}
      </section>

      <section className="drop-title">
        <h3>RAPNATION</h3>
        <p>DROP LIST: THE 11 EDITS</p>
      </section>

      <section className="mini-row">
        <article>
          <img
            src="https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=400&q=80"
            alt="Portrait"
          />
        </article>
        <article>
          <img
            src="https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=400&q=80"
            alt="Accessories"
          />
        </article>
        <article>
          <img
            src="https://images.unsplash.com/photo-1585386959984-a41552231658?auto=format&fit=crop&w=400&q=80"
            alt="Product shot"
          />
        </article>
      </section>

      <section className="what-block">
        <h4>WHAT DO WE DO?</h4>
        <div className="tag-line">CUT. PRINT. MOVE. REPEAT.</div>
      </section>

      <section className="bottom-banner">
        <img
          src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=80"
          alt="Black tee in architecture space"
        />
      </section>
    </main>
  );
}

export default Home;