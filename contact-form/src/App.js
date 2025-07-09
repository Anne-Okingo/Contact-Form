import React, { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("idle");
  const [theme, setTheme] = useState("light");

  // Load saved theme on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  // Apply theme to entire page
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.style.backgroundColor = theme === "dark" ? "#121212" : "#ffffff";
    document.body.style.color = theme === "dark" ? "#eaeaea" : "#333333";
    document.body.style.transition = "background-color 0.3s, color 0.3s";
  }, [theme]);

  const isDark = theme === "dark";

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus("submitting");

    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mwpbdznq", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
      } else {
        const data = await response.json();
        console.error("Formspree error:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Network or unexpected error:", err.message);
      setStatus("error");
    }
  };

  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "3rem auto",
        padding: "2rem",
        lineHeight: 1.6,
        borderRadius: "8px",
        boxShadow: isDark
          ? "0 0 10px rgba(255, 255, 255, 0.1)"
          : "0 0 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
        color: isDark ? "#eaeaea" : "#333",
        transition: "all 0.3s ease",
      }}
    >
      {/* Theme Toggle */}
      <div style={{ textAlign: "right", marginBottom: "1rem" }}>
        <button
          onClick={handleThemeToggle}
          aria-label="Toggle theme"
          style={{
            background: "none",
            border: "1px solid",
            borderColor: isDark ? "#aaa" : "#ccc",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
            color: isDark ? "#fff8dc" : "#333",
            fontWeight: "bold",
          }}
        >
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

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
         Your message has been sent successfully!
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
          Something went wrong. Please try again.
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
          style={inputStyle(isDark)}
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
          style={inputStyle(isDark)}
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
          style={{ ...inputStyle(isDark), resize: "vertical" }}
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

// Style functions
const inputStyle = (isDark) => ({
  width: "100%",
  padding: "0.75rem",
  fontSize: "1rem",
  marginBottom: "1.5rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: isDark ? "#2a2a2a" : "#fff",
  color: isDark ? "#f1f1f1" : "#000",
  outlineColor: "#007bff",
});

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
