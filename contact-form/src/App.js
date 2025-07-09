import React, { useState } from "react";

function App() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus("submitting");

    const formData = new FormData(form);

    const response = await fetch("https://formspree.io/f/mwpbdznq", {
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
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "1rem",
        lineHeight: 1.6,
        color: "#333",
      }}
    >
      <h1 tabIndex="0">Contact Me</h1>
      <p tabIndex="0">Fill out the form below and I’ll get back to you!</p>

      {/* Success Message */}
      {status === "success" && (
        <div
          role="status"
          aria-live="polite"
          style={{
            color: "#155724",
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            padding: "1rem",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
        >
          ✅ Your message has been sent successfully!
        </div>
      )}

      {/* Error Message */}
      {status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            color: "#721c24",
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            padding: "1rem",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
        >
          ❌ Something went wrong. Please try again.
        </div>
      )}

      {/* Contact Form */}
      <form onSubmit={handleSubmit} aria-label="Contact Form">
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          id="name"
          type="text"
          required
          aria-required="true"
          placeholder="Your name"
          aria-label="Name"
          style={inputStyle}
        />

        <label htmlFor="email">Email:</label>
        <input
          name="email"
          id="email"
          type="email"
          required
          aria-required="true"
          placeholder="your@email.com"
          aria-label="Email"
          style={inputStyle}
        />

        <label htmlFor="message">Message:</label>
        <textarea
          name="message"
          id="message"
          required
          aria-required="true"
          rows="5"
          placeholder="Write your message here..."
          aria-label="Message"
          style={{ ...inputStyle, resize: "vertical" }}
        />

        <button
          type="submit"
          disabled={status === "submitting"}
          style={buttonStyle}
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </main>
  );
}

// ✅ Style Objects
const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  fontSize: "1rem",
  marginBottom: "1.5rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
  outlineColor: "#007bff",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default App;
