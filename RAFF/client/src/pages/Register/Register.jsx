import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = () => {
    if (!fullName || !email || !password) {
      setMessage("Please fill all fields.");
      return;
    }
    login(email);
    setMessage("Account created successfully.");
    setTimeout(() => navigate("/"), 600);
  };

  return (
    <section className="container" style={{ padding: "60px 20px" }}>
      <h1>Register</h1>

      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
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

      <button onClick={onSubmit}>Create Account</button>
      {message ? <p style={{ marginTop: "10px" }}>{message}</p> : null}
      <p style={{ marginTop: "12px" }}>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}

export default Register;