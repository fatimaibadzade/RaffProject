import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import "../../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const { login, authLoading } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      await login({ email, password });
      setSuccess("You are signed in. Redirecting to the home page...");
      setTimeout(() => navigate("/"), 700);
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <section className="auth-page">
      <aside className="auth-aside">
        <span className="auth-aside__eyebrow">Member access</span>
        <h1>Sign in to your RAF account.</h1>
        <p>
          Track orders, keep your wishlist synced, and move through checkout like
          a premium store experience.
        </p>

        <div className="auth-benefits">
          <div>
            <strong>Fast checkout</strong>
            Your profile details stay ready for the next order.
          </div>
          <div>
            <strong>Saved favorites</strong>
            Keep the pieces you want in one place.
          </div>
          <div>
            <strong>Secure access</strong>
            Login now works through the backend API with validation.
          </div>
        </div>
      </aside>

      <div className="auth-card">
        <div className="auth-card__header">
          <h2>Welcome back</h2>
          <p>
            Enter your details to continue shopping with a cleaner, more
            professional account flow.
          </p>
        </div>

        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              placeholder="Enter your password"
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
            {authLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="auth-meta">
          No account yet? <Link to="/register">Create one here</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;