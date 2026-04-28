import "./BrandLogo.css";

function BrandLogo({ compact = false, light = false }) {
  const className = [
    "brand-logo",
    compact ? "brand-logo--compact" : "",
    light ? "brand-logo--light" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} aria-label="RAF logo">
      <svg viewBox="0 0 88 88" className="brand-logo__mark" role="img" aria-hidden="true">
        <rect x="4" y="4" width="80" height="80" rx="24" />
        <path d="M25 60V28h17.5c10.2 0 16.5 4.8 16.5 13.2 0 8.1-5.8 12.8-15.6 12.8H35.5V60H25Zm10.5-14.5h7.6c3.7 0 5.8-1.5 5.8-4.4 0-3-2.1-4.6-5.8-4.6h-7.6v9Z" />
        <path d="M49.5 60 58 28h5.2l8.5 32h-9.6l-1.2-5.5h-8.8L51 60h-1.5Zm4.3-12.8h5.5l-2.7-12.6-2.8 12.6Z" />
      </svg>

      <div className="brand-logo__text">
        <span className="brand-logo__eyebrow">atelier</span>
        <strong>RAF</strong>
      </div>
    </div>
  );
}

export default BrandLogo;
