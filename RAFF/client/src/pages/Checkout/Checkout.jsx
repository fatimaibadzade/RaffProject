function Checkout() {
    return (
      <section style={{ padding: "60px 40px" }}>
        <h1>Checkout</h1>
  
        <input placeholder="Full Name" />
        <input placeholder="Address" />
        <input placeholder="Phone Number" />
  
        <button style={{ marginTop: "20px" }}>
          Pay Now
        </button>
      </section>
    );
  }
  
  export default Checkout;