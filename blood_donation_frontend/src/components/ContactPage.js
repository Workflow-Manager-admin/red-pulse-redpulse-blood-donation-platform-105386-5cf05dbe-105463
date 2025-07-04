import React, { useState, useContext } from "react";
import { DonorContext } from "./_DonorContext";

function SpinnerMini() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 15,
        height: 15,
        border: "3px solid var(--color-primary)",
        borderBottomColor: "transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        marginRight: 7,
      }}
      aria-hidden="true"
      role="status"
    />
  );
}

// PUBLIC_INTERFACE
function ContactPage() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { showNotification } = useContext(DonorContext);

  // PUBLIC_INTERFACE
  const validate = () => {
    let errs = {};
    if (!fields.name.trim()) errs.name = "Name is required";
    if (!fields.email.includes("@")) errs.email = "Valid email required";
    if (!fields.message.trim()) errs.message = "Message required";
    return errs;
  };

  // PUBLIC_INTERFACE
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showNotification("Please fix form errors.", "error");
      return;
    }
    setSubmitting(true);
    // Simulate async send
    setTimeout(() => {
      setSubmitting(false);
      setFields({ name: "", email: "", message: "" });
      setErrors({});
      showNotification("Thank you for contacting us! We'll get back to you soon.", "success");
    }, 900);
  };

  return (
    <div className="card effect-card" aria-label="Contact the organization">
      <div className="card-title">Contact Us</div>
      <div className="card-desc">
        Have a question or want to help? We&apos;re happy to hear from you.<br />
        <span style={{ color: "var(--color-primary)" }}>
          <b>Email:</b> support@redpulse.org<br />
          <b>Phone:</b> +91-98765-12345<br />
        </span>
      </div>
      <form onSubmit={handleSubmit} aria-label="Contact form" autoComplete="off">
        <label htmlFor="contactName">Name</label>
        <input
          id="contactName"
          name="name"
          type="text"
          value={fields.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "cname-err" : undefined}
          required
        />
        {errors.name && <div id="cname-err" className="form-error">{errors.name}</div>}
        <label htmlFor="contactEmail">Email</label>
        <input
          id="contactEmail"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cemail-err" : undefined}
          required
        />
        {errors.email && <div id="cemail-err" className="form-error">{errors.email}</div>}
        <label htmlFor="contactMsg">Message</label>
        <textarea
          id="contactMsg"
          name="message"
          value={fields.message}
          onChange={handleChange}
          rows={3}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cmsg-err" : undefined}
          required
        />
        {errors.message && <div id="cmsg-err" className="form-error">{errors.message}</div>}
        <button
          type="submit"
          aria-label="Send message"
          className="animated-btn"
          disabled={submitting}
          style={{ opacity: submitting ? 0.7 : 1 }}
        >
          {submitting ? (<><SpinnerMini /> Sending...</>) : "Send"}
        </button>
      </form>
    </div>
  );
}

export default ContactPage;
