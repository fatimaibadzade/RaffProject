import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import "../../styles/auth.css";
import { useUi } from "../../context/UiContext";

function Register() {
  const navigate = useNavigate();
  const { register, authLoading } = useStore();
  const { t } = useUi();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName || !email || !password) {
      setError(t("register.error.fillAll"));
      return;
    }

    if (password.length < 6) {
      setError(t("register.error.passwordTooShort"));
      return;
    }

    try {
      await register({ fullName, email, password });
      setSuccess(t("register.success"));
      setTimeout(() => navigate("/"), 700);
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <section className="auth-page">
      <aside className="auth-aside">
        <span className="auth-aside__eyebrow">{t("register.newMember")}</span>
        <h1>{t("register.h1")}</h1>
        <p>{t("register.p")}</p>

        <div className="auth-benefits">
          <div>
            <strong>{t("register.benefit.personal.strong")}</strong>
            {t("register.benefit.personal.text")}
          </div>
          <div>
            <strong>{t("register.benefit.wishlist.strong")}</strong>
            {t("register.benefit.wishlist.text")}
          </div>
          <div>
            <strong>{t("register.benefit.better.strong")}</strong>
            {t("register.benefit.better.text")}
          </div>
        </div>
      </aside>

      <div className="auth-card">
        <div className="auth-card__header">
          <h2>{t("register.card.title")}</h2>
          <p>{t("register.card.p")}</p>
        </div>

        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-field">
            <label htmlFor="register-name">{t("register.fullName")}</label>
            <input
              id="register-name"
              placeholder={t("register.placeholder.fullName")}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="register-email">{t("register.email")}</label>
            <input
              id="register-email"
              placeholder={t("register.placeholder.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="register-password">{t("register.password")}</label>
            <input
              id="register-password"
              placeholder={t("register.placeholder.password")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error ? <div className="auth-message auth-message--error">{error}</div> : null}
          {success ? (
            <div className="auth-message auth-message--success">{success}</div>
          ) : null}

          <button className="auth-submit" type="submit" disabled={authLoading}>
            {authLoading ? t("register.button.creating") : t("register.button.create")}
          </button>
        </form>

        <p className="auth-meta">
          {t("register.meta.already")} <Link to="/login">{t("register.meta.linkText")}</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;