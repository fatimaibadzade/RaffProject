import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import "../../styles/auth.css";
import { useUi } from "../../context/UiContext";

function Login() {
  const navigate = useNavigate();
  const { login, authLoading } = useStore();
  const { t } = useUi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError(t("login.error.missingFields"));
      return;
    }

    try {
      await login({ email, password });
      setSuccess(t("login.success.signedIn"));
      setTimeout(() => navigate("/"), 700);
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <section className="auth-page">
      <aside className="auth-aside">
        <span className="auth-aside__eyebrow">{t("login.memberAccess")}</span>
        <h1>{t("login.h1")}</h1>
        <p>
          {t("login.p")}
        </p>

        <div className="auth-benefits">
          <div>
            <strong>{t("login.benefit.fast.strong")}</strong>
            {t("login.benefit.fast.text")}
          </div>
          <div>
            <strong>{t("login.benefit.saved.strong")}</strong>
            {t("login.benefit.saved.text")}
          </div>
          <div>
            <strong>{t("login.benefit.secure.strong")}</strong>
            {t("login.benefit.secure.text")}
          </div>
        </div>
      </aside>

      <div className="auth-card">
        <div className="auth-card__header">
          <h2>{t("login.card.welcome")}</h2>
          <p>
            {t("login.card.p")}
          </p>
        </div>

        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-field">
            <label htmlFor="login-email">{t("login.email")}</label>
            <input
              id="login-email"
              placeholder={t("login.placeholder.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="login-password">{t("login.password")}</label>
            <input
              id="login-password"
              placeholder={t("login.placeholder.password")}
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
            {authLoading ? t("login.button.signingIn") : t("login.button.signIn")}
          </button>
        </form>

        <p className="auth-meta">
          {t("login.meta.noAccountPrefix")}{" "}
          <Link to="/register">{t("login.meta.linkText")}</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;