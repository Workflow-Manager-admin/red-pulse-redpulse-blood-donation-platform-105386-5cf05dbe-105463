import React, { useState } from "react";

// PUBLIC_INTERFACE
function ContactPage() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [feedback, setFeedback] = useState(null);

  // PUBLIC_INTERFACE
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setFeedback(null);
  };

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fields.name.trim() || !fields.email.includes("@") || !fields.message.trim()) {
      setFeedback({ type: "error", text: "All fields must be filled out with valid info." });
      return;
    }
    setFeedback({ type: "success", text: "Thank you for contacting us! We'll get back to you soon." });
    setFields({ name: "", email: "", message: "" });
  };

  return (
    <div className="card" aria-label="Contact the organization">
      <div className="card-title">Contact Us</div>
      <div className="card-desc">
        Have a question or want to help? We're happy to hear from you.<br />
        <span style={{color: "var(--color-primary)"}}>
          <b>Email:</b> support@redpulse.org<br />
          <b>Phone:</b> +91-98765-12345<br />
        </span>
      </div>
      {feedback && (
        <div className={feedback.type === "error" ? "form-error" : "form-success"} role={feedback.type === "error" ? "alert" : "status"}>
          {feedback.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="contactName">Name</label>
        <input
          id="contactName"
          name="name"
          type="text"
          value={fields.name}
          onChange={handleChange}
        />
        <label htmlFor="contactEmail">Email</label>
        <input
          id="contactEmail"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
        />
        <label htmlFor="contactMsg">Message</label>
        <textarea
          id="contactMsg"
          name="message"
          value={fields.message}
          onChange={handleChange}
          rows={3}
        />
        <button type="submit" aria-label="Send message">Send</button>
      </form>
    </div>
  );
}

export default ContactPage;
