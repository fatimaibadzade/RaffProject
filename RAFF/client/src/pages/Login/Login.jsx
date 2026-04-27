import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = () => {
    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }
    login(email);
    setMessage("Logged in successfully.");
    setTimeout(() => navigate("/"), 600);
  };

  return (
    <section className="container" style={{ padding: "60px 20px" }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={onSubmit}>Login</button>
      {message ? <p style={{ marginTop: "10px" }}>{message}</p> : null}
      <p style={{ marginTop: "12px" }}>
        No account? <Link to="/register">Create one</Link>
      </p>
    </section>
  );
}

export default Login;