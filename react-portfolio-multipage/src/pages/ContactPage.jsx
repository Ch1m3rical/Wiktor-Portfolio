import React, { useState } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/mjkdpbgv";

export default function ContactPage() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.target;
    const data = new FormData(form);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError("Something went wrong. Please try again.");
      }
    } catch (e) {
      console.error(e);
      setStatus("error");
      setError("Network error. Please try again.");
    }
  };

  return (
    <section className="section section--contact">
      <div className="section__header">
        <h2>Contact</h2>
        <p>
          Have a question, a project, or just want to say hi? Reach out
          using the form below.
        </p>
      </div>

      <form className="contact__form" onSubmit={handleSubmit}>
        <div className="form__field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            required
            placeholder="Your name"
          />
        </div>

        <div className="form__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="_replyto"
            required
            placeholder="you@example.com"
          />
        </div>

        <div className="form__field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows="4"
            placeholder="Tell me about your idea..."
          />
        </div>

        <button
          className="button button--primary"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>

        {status === "success" && (
          <p className="form__status form__status--success">
            Thanks! Your message has been sent.
          </p>
        )}
        {status === "error" && (
          <p className="form__status form__status--error">{error}</p>
        )}

        <p className="form__fallback">
          Prefer email?{" "}
          <a href="mailto:wojtanwiktor3@gmail.com">
            Open your mail client.
          </a>
        </p>
      </form>
    </section>
  );
}
