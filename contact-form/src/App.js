import React from "react";

function App() {
  return (
    <main style={{ fontFamily: "Arial", maxWidth: "600px", margin: "2rem auto" }}>
      <h1>Contact Me</h1>
      <p>Fill out the form below and I’ll get back to you!</p>

      <form>
  <label htmlFor="name">Name:</label>
  <input
    name="name"
    id="name"
    type="text"
    required
    style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
  />

  <label htmlFor="email">Email:</label>
  <input
    name="email"
    id="email"
    type="email"
    required
    style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
  />

  <label htmlFor="message">Message:</label>
  <textarea
    name="message"
    id="message"
    required
    rows="5"
    style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
  />

  <button
    type="submit"
    style={{
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "0.6rem 1.2rem",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    }}
  >
    Send Message
  </button>
</form>

    </main>
  );
}

export default App;
