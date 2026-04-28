import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import "../../styles/auth.css";

function Register() {
  const navigate = useNavigate();
  const { register, authLoading } = useStore();
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
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      await register({ fullName, email, password });
      setSuccess("Account created successfully. Redirecting...");
      setTimeout(() => navigate("/"), 700);
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <section className="auth-page">
      <aside className="auth-aside">
        <span className="auth-aside__eyebrow">New member</span>
        <h1>Create an account that feels premium.</h1>
        <p>
          Register like on a modern ecommerce site: clear validation, secure auth,
          and a cleaner visual experience.
        </p>

        <div className="auth-benefits">
          <div>
            <strong>Personal account</strong>
            Keep your login active and your shopping flow smooth.
          </div>
          <div>
            <strong>Wishlist ready</strong>
            Save pieces you want to buy later.
          </div>
          <div>
            <strong>Better experience</strong>
            The forms now work with a real backend instead of only local state.
          </div>
        </div>
      </aside>

      <div className="auth-card">
        <div className="auth-card__header">
          <h2>Create your account</h2>
          <p>
            Join the store with a simple but polished sign-up form and secure
            session storage.
          </p>
        </div>

        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-field">
            <label htmlFor="register-name">Full name</label>
            <input
              id="register-name"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              placeholder="At least 6 characters"
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
            {authLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="auth-meta">
          Already registered? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;