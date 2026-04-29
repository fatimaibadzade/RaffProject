import "./Home.css";
import { Link } from "react-router-dom";
import BrandLogo from "../../components/BrandLogo/BrandLogo";
import { useUi } from "../../context/UiContext";

const featuredCardsByLang = {
  en: [
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
  ],
  ru: [
    {
      id: 1,
      name: "Верхняя одежда",
      description: "Слоистые силуэты с премиальными текстурами.",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Аксессуары",
      description: "Кепки, сумки и заметные вещи на каждый день.",
      image:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "База",
      description: "Чистые базовые вещи для повторной носки.",
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Лимитированный дроп",
      description: "Малые партии с более сильным визуальным направлением.",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
    }
  ]
  ,
  az: [
    {
      id: 1,
      name: "Üst geyim",
      description: "Premium teksturalı qat-qat siluetlər.",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Aksesuarlar",
      description: "Gündəlik seçimi tamamlayan şapka, çanta və aksesuarlar.",
      image:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Əsaslar",
      description: "Dəyişmədən təkrar geyinmək üçün hazırlanmış əsas parçalar.",
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Məhdud Buraxılış",
      description: "Güclü vizual istiqaməti olan kiçik partiyalı məhsullar.",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
    }
  ]
};

const storyCardsByLang = {
  en: [
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
  ],
  ru: [
    {
      id: 1,
      title: "Редакционная стилизация",
      subtitle: "Премиальные визуалы для более чистой айдентики.",
      image:
        "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Посадка на теле",
      subtitle: "Композиции поданы как в профессиональном fashion-магазине.",
      image:
        "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Уличное настроение",
      subtitle: "Энергия кампании с более спокойной и премиальной версткой.",
      image:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80"
    }
  ]
  ,
  az: [
    {
      id: 1,
      title: "Redaksion stil",
      subtitle: "Daha təmiz brend identikliyi üçün premium vizuallar.",
      image:
        "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Bədənə uyğun oturuş",
      subtitle: "Peşəkar fashion mağazası kimi təqdim edilən parçalar.",
      image:
        "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Küçə ruhu",
      subtitle: "Daha sakit və premium layout ilə kampaniya enerjisi.",
      image:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80"
    }
  ]
};

function Home() {
  const { t, language, theme } = useUi();
  const featuredCards = featuredCardsByLang[language] ?? featuredCardsByLang.en;
  const storyCards = storyCardsByLang[language] ?? storyCardsByLang.en;

  return (
    <main className="home">
      <section className="hero-block">
        <div className="hero-copy">
          <span className="hero-eyebrow">{t("home.eyebrow")}</span>
          <div className="hero-brand">
            <BrandLogo light={theme === "dark"} />
          </div>
          <h1>{t("home.h1")}</h1>
          <p>{t("home.p")}</p>

          <div className="hero-actions">
            <Link to="/shop" className="hero-button hero-button--dark">
              {t("home.shopCollection")}
            </Link>
            <Link to="/register" className="hero-button">
              {t("home.createAccount")}
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>{t("home.stats.24h.strong")}</strong>
              <span>{t("home.stats.24h.span")}</span>
            </div>
            <div>
              <strong>{t("home.stats.new.strong")}</strong>
              <span>{t("home.stats.new.span")}</span>
            </div>
            <div>
              <strong>{t("home.stats.clean.strong")}</strong>
              <span>{t("home.stats.clean.span")}</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visual__art" aria-hidden="true">
            <div className="hero-orb hero-orb--left" />
            <div className="hero-orb hero-orb--right" />
            <div className="hero-showcase">
              <div className="hero-showcase__panel hero-showcase__panel--tall">
                <span>{t("home.showcase.capsule.span")}</span>
                <strong>{t("home.showcase.capsule.strong")}</strong>
              </div>
              <div className="hero-showcase__stack">
                <div className="hero-showcase__panel">
                  <span>{t("home.showcase.texture.span")}</span>
                  <strong>{t("home.showcase.texture.strong")}</strong>
                </div>
                <div className="hero-showcase__panel hero-showcase__panel--accent">
                  <span>{t("home.showcase.identity.span")}</span>
                  <strong>{t("home.showcase.identity.strong")}</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-floating-card">
            <span>{t("home.floating.drop")}</span>
            <strong>{t("home.floating.strong")}</strong>
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
          <span className="section-label">{t("home.brandDirection.label")}</span>
          <h2>{t("home.brandDirection.h2")}</h2>
        </div>
        <p className="tag-line">{t("home.brandDirection.p")}</p>
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
          <span className="section-label">{t("home.why.label")}</span>
          <h3>{t("home.why.h3")}</h3>
        </div>
        <p>{t("home.why.p")}</p>
      </section>

      <section className="mini-row">
        <article>
          <img
            src="https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=400&q=80"
            alt={t("home.mini.alt1")}
          />
        </article>
        <article>
          <img
            src="https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=400&q=80"
            alt={t("home.mini.alt2")}
          />
        </article>
        <article>
          <img
            src="https://images.unsplash.com/photo-1585386959984-a41552231658?auto=format&fit=crop&w=400&q=80"
            alt={t("home.mini.alt3")}
          />
        </article>
      </section>

      <section className="what-block">
        <div className="what-block__copy">
          <span className="section-label">{t("home.upgrades.label")}</span>
          <h4>{t("home.upgrades.h4")}</h4>
          <div className="tag-line">{t("home.upgrades.tagLine")}</div>
        </div>

        <div className="what-block__panel">
          <strong>{t("home.upgrades.included.strong")}</strong>
          <ul>
            <li>{t("home.upgrades.included.li1")}</li>
            <li>{t("home.upgrades.included.li2")}</li>
            <li>{t("home.upgrades.included.li3")}</li>
            <li>{t("home.upgrades.included.li4")}</li>
          </ul>
        </div>
      </section>

      <section className="bottom-banner">
        <div className="bottom-banner__content">
          <div>
            <span className="section-label">{t("home.ready.label")}</span>
            <h5>{t("home.ready.h5")}</h5>
            <p>{t("home.ready.p")}</p>
          </div>
          <Link to="/shop" className="hero-button hero-button--dark">
            {t("home.exploreProducts")}
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;