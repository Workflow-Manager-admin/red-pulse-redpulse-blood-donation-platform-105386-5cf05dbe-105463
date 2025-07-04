import React, { useState } from "react";

// Blood groups for selection
const bloodGroups = [
  "A+", "A-", "B+", "B-",
  "AB+", "AB-", "O+", "O-",
];

// PUBLIC_INTERFACE
function RegisterPage() {
  const [fields, setFields] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    city: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [resultMsg, setResultMsg] = useState(null);

  // PUBLIC_INTERFACE
  const validate = () => {
    let errs = {};
    if (!fields.name.trim()) errs.name = "Name is required";
    if (!/^\d{2}$|^[1-9]\d{1,2}$/.test(fields.age) || +fields.age < 18 || +fields.age > 70) errs.age = "Valid age (18-70) required";
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
    setResultMsg(null);
  };

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    // Simulated API call stub for registering donor
    setResultMsg("Submitting...");
    setTimeout(() => {
      setResultMsg({
        type: "success",
        text: "Registration successful! Thank you for signing up as a donor."
      });
      setFields({
        name: "",
        age: "",
        bloodGroup: "",
        city: "",
        phone: "",
        email: "",
      });
    }, 1000);
  };

  return (
    <div className="card" aria-label="Register as blood donor">
      <div className="card-title">Donor Registration</div>
      <div className="card-desc">
        Fill out the form to become a blood donor. Your details help save lives.
      </div>
      {resultMsg && (
        <div
          className={
            resultMsg.type === "success" ? "form-success" : "form-error"
          }
          role={resultMsg.type === "success" ? "status" : "alert"}
        >
          {typeof resultMsg === "string" ? resultMsg : resultMsg.text}
        </div>
      )}
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          maxLength={40}
          value={fields.name}
          onChange={handleChange}
          autoComplete="name"
        />
        {errors.name && <div className="form-error">{errors.name}</div>}

        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          min={18}
          max={70}
          value={fields.age}
          onChange={handleChange}
        />
        {errors.age && <div className="form-error">{errors.age}</div>}

        <label htmlFor="bloodGroup">Blood Group</label>
        <select
          id="bloodGroup"
          name="bloodGroup"
          value={fields.bloodGroup}
          onChange={handleChange}
        >
          <option value="">-- Select --</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
        {errors.bloodGroup && <div className="form-error">{errors.bloodGroup}</div>}

        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          type="text"
          maxLength={32}
          value={fields.city}
          onChange={handleChange}
        />
        {errors.city && <div className="form-error">{errors.city}</div>}

        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          pattern="[0-9]{10}"
          maxLength={10}
          value={fields.phone}
          onChange={handleChange}
        />
        {errors.phone && <div className="form-error">{errors.phone}</div>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          autoComplete="email"
        />
        {errors.email && <div className="form-error">{errors.email}</div>}

        <button type="submit" aria-label="Register now">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
