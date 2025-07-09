import React, { useState } from "react";

function App() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus("submitting");

    const formData = new FormData(form);

    const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });

    if (response.ok) {
      form.reset();
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <main style={{ fontFamily: "Arial", maxWidth: "600px", margin: "2rem auto" }}>
      <h1>Contact Me</h1>
      <p>Fill out the form below and I’ll get back to you!</p>

      {status === "success" && (
        <div role="status" style={{ color: "green", marginBottom: "1rem" }}>
          ✅ Your message has been sent!
        </div>
      )}

      {status === "error" && (
        <div role="alert" style={{ color: "red", marginBottom: "1rem" }}>
          ❌ Something went wrong. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
          disabled={status === "submitting"}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "0.6rem 1.2rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </main>
  );
}

export default App;
