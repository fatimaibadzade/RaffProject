import "./Home.css";
import { Link } from "react-router-dom";
import BrandLogo from "../../components/BrandLogo/BrandLogo";

const featuredCards = [
  {
    id: 1,
    name: "Outerwear",
    description: "Layered silhouettes with premium textures.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Accessories",
    description: "Caps, bags, and everyday statement pieces.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Essentials",
    description: "Clean core items built for repeat wear.",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Limited Drop",
    description: "Small-batch pieces with stronger visual direction.",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
  }
];

const storyCards = [
  {
    id: 1,
    title: "Editorial styling",
    subtitle: "Premium visuals for a cleaner brand identity.",
    image:
      "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "On-body fit",
    subtitle: "Pieces presented like a professional fashion store.",
    image:
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Street mood",
    subtitle: "Campaign energy with a calmer, more premium layout.",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80"
  }
];

function Home() {
  return (
    <main className="home">
      <section className="hero-block">
        <div className="hero-copy">
          <span className="hero-eyebrow">Refined streetwear storefront</span>
          <div className="hero-brand">
            <BrandLogo />
          </div>
          <h1>Make the brand feel premium at first glance.</h1>
          <p>
            A more polished homepage, stronger hierarchy, and cleaner shopping
            flow inspired by professional ecommerce websites.
          </p>

          <div className="hero-actions">
            <Link to="/shop" className="hero-button hero-button--dark">
              Shop collection
            </Link>
            <Link to="/register" className="hero-button">
              Create account
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>24h</strong>
              <span>average order dispatch</span>
            </div>
            <div>
              <strong>New</strong>
              <span>authentication experience</span>
            </div>
            <div>
              <strong>Clean</strong>
              <span>premium visual system</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visual__art" aria-hidden="true">
            <div className="hero-orb hero-orb--left" />
            <div className="hero-orb hero-orb--right" />
            <div className="hero-showcase">
              <div className="hero-showcase__panel hero-showcase__panel--tall">
                <span>Capsule</span>
                <strong>Minimal layers</strong>
              </div>
              <div className="hero-showcase__stack">
                <div className="hero-showcase__panel">
                  <span>Texture</span>
                  <strong>Soft neutrals</strong>
                </div>
                <div className="hero-showcase__panel hero-showcase__panel--accent">
                  <span>Identity</span>
                  <strong>RAF signature drop</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-floating-card">
            <span>Drop 04</span>
            <strong>Structured layers, neutral palette, premium feel.</strong>
          </div>
        </div>
      </section>

      <section className="product-row">
        {featuredCards.map((product) => (
          <article key={product.id} className="mini-card">
            <img src={product.image} alt={product.name} />
            <div>
              <p>{product.name}</p>
              <span>{product.description}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="graffiti-section">
        <div>
          <span className="section-label">Brand direction</span>
          <h2>Cleaner layout. Better product focus.</h2>
        </div>
        <p className="tag-line">
          Large visuals, softer colors, and more breathing room make the site feel
          closer to a professional fashion store.
        </p>
      </section>

      <section className="story-grid">
        {storyCards.map((item) => (
          <article key={item.id} className="story-card">
            <img src={item.image} alt={item.title} />
            <div className="story-card__content">
              <strong>{item.title}</strong>
              <span>{item.subtitle}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="drop-title">
        <div>
          <span className="section-label">Why it feels better</span>
          <h3>Professional polish across the key pages</h3>
        </div>
        <p>
          The main screen, account flow, navbar, and footer now look more
          intentional and easier to trust.
        </p>
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
        <div className="what-block__copy">
          <span className="section-label">Store upgrades</span>
          <h4>Registration now behaves like a real website.</h4>
          <div className="tag-line">
            Users can sign up, sign in, stay authenticated, and see account state
            in the navigation.
          </div>
        </div>

        <div className="what-block__panel">
          <strong>Included in this refresh</strong>
          <ul>
            <li>Backend API for register and login</li>
            <li>Password hashing and JWT token creation</li>
            <li>Polished auth forms with feedback states</li>
            <li>Cleaner premium visual identity for the site</li>
          </ul>
        </div>
      </section>

      <section className="bottom-banner">
        <div className="bottom-banner__content">
          <div>
            <span className="section-label">Ready for growth</span>
            <h5>Next-level storefront foundations are in place.</h5>
            <p>
              You can now continue with product API integration, user profiles, and
              real checkout processing on top of this cleaner base.
            </p>
          </div>
          <Link to="/shop" className="hero-button hero-button--dark">
            Explore products
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;