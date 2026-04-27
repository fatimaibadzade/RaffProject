function Register() {
    return (
      <section className="container" style={{ padding: "60px 0" }}>
        <h1>Register</h1>
  
        <input placeholder="Full Name" />
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
  
        <button>Create Account</button>
      </section>
    );
  }
  
  export default Register;