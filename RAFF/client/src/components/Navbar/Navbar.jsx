import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useStore } from "../../context/StoreContext";
import BrandLogo from "../BrandLogo/BrandLogo";
import { useUi } from "../../context/UiContext";
import { useEffect, useMemo, useRef, useState } from "react";

function Navbar() {
  const { cart, wishlist, currentUser, logout } = useStore();
  const { theme, t, setTheme, language, setLanguage } = useUi();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const displayName =
    currentUser?.fullName || currentUser?.email || t("navbar.guest");

  const [langOpen, setLangOpen] = useState(false);
  const langWrapRef = useRef(null);

  useEffect(() => {
    if (!langOpen) return;
    function onDocClick(e) {
      if (!langWrapRef.current) return;
      if (langWrapRef.current.contains(e.target)) return;
      setLangOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [langOpen]);

  const languageItems = useMemo(
    () => [
      { key: "en", label: "EN" },
      { key: "ru", label: "RU" },
      { key: "az", label: "AZ" }
    ],
    []
  );

  return (
    <header className="navbar">
      <div className="top-line">
        <span>{t("navbar.topLeft")}</span>
        <span>
          {currentUser ? t("navbar.signedInAs", { name: displayName }) : t("navbar.secureAccess")}
        </span>
      </div>

      <div className="navbar-main">
        <Link to="/" className="brand-block">
          <BrandLogo compact light={theme === "dark"} />
        </Link>

        <nav className="nav-links">
          <NavLink to="/">{t("navbar.home")}</NavLink>
          <NavLink to="/shop">{t("navbar.shop")}</NavLink>
          <NavLink to="/wishlist">
            {t("navbar.wishlist")} <span className="count-badge">{wishlist.length}</span>
          </NavLink>
          <NavLink to="/cart">
            {t("navbar.cart")} <span className="count-badge">{cartCount}</span>
          </NavLink>
        </nav>

        <nav className="auth-links">
          {currentUser ? (
            <>
              <div className="auth-user">
                <span className="auth-user__label">{t("navbar.account")}</span>
                <strong>{displayName}</strong>
              </div>
              <button onClick={logout} type="button" className="auth-pill auth-pill--dark">
                {t("navbar.logout")}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-pill">
                {t("navbar.signIn")}
              </Link>
              <Link to="/register" className="auth-pill auth-pill--dark">
                {t("navbar.createAccount")}
              </Link>
            </>
          )}

          <div className="navbar-side-actions" ref={langWrapRef}>
            <div className="navbar-theme">
              <button
                type="button"
                className={`navbar-iconbtn ${
                  theme === "light" ? "navbar-iconbtn--active" : ""
                }`}
                aria-label="Switch to light theme"
                onClick={() => setTheme("light")}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                  focusable="false"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="M4.93 4.93l1.41 1.41" />
                  <path d="M17.66 17.66l1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="M4.93 19.07l1.41-1.41" />
                  <path d="M17.66 6.34l1.41-1.41" />
                </svg>
              </button>

              <button
                type="button"
                className={`navbar-iconbtn ${
                  theme === "dark" ? "navbar-iconbtn--active" : ""
                }`}
                aria-label="Switch to dark theme"
                onClick={() => setTheme("dark")}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79Z"
                  />
                </svg>
              </button>
            </div>

            <div className="navbar-lang">
              <button
                type="button"
                className="navbar-lang__btn"
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={langOpen}
              >
                {t("side.lang")}{" "}
                <span className="navbar-lang__code">{language.toUpperCase()}</span>
              </button>

              {langOpen ? (
                <div className="navbar-lang__menu" role="menu">
                  {languageItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className={`navbar-lang__item ${
                        language === item.key ? "navbar-lang__item--active" : ""
                      }`}
                      onClick={() => {
                        setLanguage(item.key);
                        setLangOpen(false);
                      }}
                      role="menuitem"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;