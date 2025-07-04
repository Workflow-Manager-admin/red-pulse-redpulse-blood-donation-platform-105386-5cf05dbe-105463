import React, { useState, useContext, useRef } from "react";
import { DonorContext } from "./_DonorContext";

// Spinner animation. (Consistent with rest of UI).
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
        verticalAlign: "middle"
      }}
      aria-hidden="true"
      role="status"
    />
  );
}

// PUBLIC_INTERFACE
/**
 * ContactPage component: Contact us form styled per Apple inspiration.
 * Includes live validation and contextual feedback/state.
 */
function ContactPage() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(""); // local stateful feedback
  const formRef = useRef(null);
  const { showNotification } = useContext(DonorContext);

  // PUBLIC_INTERFACE
  /**
   * Validate form fields, returns errors for any invalid field
   */
  const validate = () => {
    let errs = {};
    if (!fields.name.trim()) errs.name = "Name is required";
    if (!fields.email.trim() || !/^.+@.+\.[a-z]{2,}$/i.test(fields.email))
      errs.email = "Valid email required";
    if (!fields.message.trim()) errs.message = "Message required";
    return errs;
  };

  // PUBLIC_INTERFACE
  /**
   * Handle change on any input field
   */
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormSuccess(""); // remove success on field change
  };

  // PUBLIC_INTERFACE
  /**
   * Handle submit for contact form
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSuccess(""); // clear previous success
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showNotification("Please fix form errors.", "error");
      if (formRef.current) {
        const firstBad = formRef.current.querySelector(
          "[aria-invalid='true']"
        );
        if (firstBad) firstBad.focus();
      }
      return;
    }
    setSubmitting(true);
    // Simulate async send
    setTimeout(() => {
      setSubmitting(false);
      setFields({ name: "", email: "", message: "" });
      setErrors({});
      setFormSuccess("Thank you for contacting us! We'll get back to you soon.");
      showNotification("Thank you for contacting us! We'll get back to you soon.", "success");
      if (formRef.current) {
        formRef.current.reset();
      }
    }, 900);
  };

  return (
    <div className="card effect-card" aria-label="Contact the organization">
      <div className="card-title" tabIndex="0">
        Contact Us
      </div>
      <div className="card-desc">
        Have a question or want to help? We&apos;re happy to hear from you.<br />
        <span style={{ color: "var(--color-primary)" }}>
          <b>Email:</b> support@redpulse.org<br />
          <b>Phone:</b> +91-98765-12345<br />
        </span>
      </div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        aria-label="Contact form"
        autoComplete="off"
        style={{ marginBottom: formSuccess ? "1em" : 0 }}
      >
        <label htmlFor="contactName">Name</label>
        <input
          id="contactName"
          name="name"
          type="text"
          value={fields.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "cname-err" : undefined}
          autoComplete="name"
          required
        />
        {errors.name && (
          <div id="cname-err" className="form-error" role="alert">
            {errors.name}
          </div>
        )}
        <label htmlFor="contactEmail">Email</label>
        <input
          id="contactEmail"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cemail-err" : undefined}
          autoComplete="email"
          required
        />
        {errors.email && (
          <div id="cemail-err" className="form-error" role="alert">
            {errors.email}
          </div>
        )}
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
        {errors.message && (
          <div id="cmsg-err" className="form-error" role="alert">
            {errors.message}
          </div>
        )}
        <button
          type="submit"
          aria-label="Send message"
          className="animated-btn"
          disabled={submitting}
          style={{
            opacity: submitting ? 0.7 : 1,
            pointerEvents: submitting ? "none" : undefined,
            marginBottom: formSuccess ? 0 : undefined
          }}
        >
          {submitting ? (
            <>
              <SpinnerMini /> Sending...
            </>
          ) : (
            "Send"
          )}
        </button>
        {formSuccess && (
          <div
            className="form-success animation-pop"
            role="status"
            aria-live="polite"
            style={{
              color: "#32e669",
              marginTop: 10,
              marginBottom: "0.6em",
              fontWeight: 600,
              textShadow: "0 1.5px 9px #23b96644"
            }}
            tabIndex="0"
          >
            {formSuccess}
          </div>
        )}
      </form>
    </div>
  );
}

export default ContactPage;
