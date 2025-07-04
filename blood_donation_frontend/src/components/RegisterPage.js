import React, { useState, useContext } from "react";
import { DonorContext } from "./_DonorContext";

// Blood groups for selection
const bloodGroups = [
  "A+", "A-", "B+", "B-",
  "AB+", "AB-", "O+", "O-",
];

// Spinner animation (for loading)
function Spinner() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 18,
        height: 18,
        border: "3px solid var(--color-primary)",
        borderBottomColor: "transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        verticalAlign: "middle",
        marginRight: 8,
      }}
      aria-hidden="true"
      role="status"
    />
  );
}

// Spinner keyframes style
const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes spin {
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(styleSheet);

// PUBLIC_INTERFACE
function RegisterPage() {
  // Context for donor memory store and notifications
  const { addDonor, showNotification, isLoading } = useContext(DonorContext);

  // Local form state
  const [fields, setFields] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    city: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // PUBLIC_INTERFACE
  const validate = () => {
    let errs = {};
    if (!fields.name.trim()) errs.name = "Name is required";
    if (!/^\d{2,3}$/.test(fields.age) || +fields.age < 18 || +fields.age > 70) errs.age = "Valid age (18-70) required";
    if (!fields.bloodGroup) errs.bloodGroup = "Blood group required";
    if (!fields.city.trim()) errs.city = "City required";
    if (!/^\d{10}$/.test(fields.phone)) errs.phone = "Valid 10-digit phone";
    if (!fields.email || !/^\S+@\S+\.\S+$/.test(fields.email)) errs.email = "Valid email required";
    return errs;
  };

  // PUBLIC_INTERFACE
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // PUBLIC_INTERFACE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showNotification("Please correct highlighted errors.", "error");
      return;
    }
    setSubmitting(true);
    // Simulate async API call
    setTimeout(() => {
      const donorObj = { ...fields, age: +fields.age, id: Date.now().toString() };
      addDonor(donorObj);
      setSubmitting(false);
      setFields({
        name: "",
        age: "",
        bloodGroup: "",
        city: "",
        phone: "",
        email: "",
      });
      showNotification("Registration successful! Thank you for signing up as a donor.", "success");
      setErrors({});
    }, 900);
  };

  return (
    <div className="card effect-card" aria-label="Register as blood donor">
      <div className="card-title" tabIndex="0">Donor Registration</div>
      <div className="card-desc">
        Fill out the form to become a blood donor. Your details help save lives.
      </div>
      <form onSubmit={handleSubmit} autoComplete="off" aria-live="polite" aria-label="Donor registration form">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          maxLength={40}
          value={fields.name}
          onChange={handleChange}
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-err" : undefined}
          required
        />
        {errors.name && <div id="name-err" className="form-error">{errors.name}</div>}

        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          min={18}
          max={70}
          inputMode="numeric"
          pattern="[0-9]*"
          value={fields.age}
          onChange={handleChange}
          aria-invalid={!!errors.age}
          aria-describedby={errors.age ? "age-err" : undefined}
          required
        />
        {errors.age && <div id="age-err" className="form-error">{errors.age}</div>}

        <label htmlFor="bloodGroup">Blood Group</label>
        <select
          id="bloodGroup"
          name="bloodGroup"
          value={fields.bloodGroup}
          onChange={handleChange}
          aria-invalid={!!errors.bloodGroup}
          aria-describedby={errors.bloodGroup ? "bg-err" : undefined}
          required
        >
          <option value="">-- Select --</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
        {errors.bloodGroup && <div id="bg-err" className="form-error">{errors.bloodGroup}</div>}

        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          type="text"
          maxLength={32}
          value={fields.city}
          onChange={handleChange}
          aria-invalid={!!errors.city}
          aria-describedby={errors.city ? "city-err" : undefined}
          required
        />
        {errors.city && <div id="city-err" className="form-error">{errors.city}</div>}

        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          pattern="[0-9]{10}"
          maxLength={10}
          inputMode="numeric"
          value={fields.phone}
          onChange={handleChange}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-err" : undefined}
          required
        />
        {errors.phone && <div id="phone-err" className="form-error">{errors.phone}</div>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-err" : undefined}
          required
        />
        {errors.email && <div id="email-err" className="form-error">{errors.email}</div>}

        <button
          type="submit"
          aria-label="Register now"
          className="animated-btn"
          disabled={submitting || isLoading}
          style={{ opacity: submitting || isLoading ? 0.7 : 1, pointerEvents: submitting ? "none" : undefined}}
        >
          {(submitting || isLoading) ? <>
            <Spinner /> Submitting...
          </> : "Register"}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
