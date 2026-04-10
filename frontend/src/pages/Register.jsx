import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const result = await register(form);

    if (result.error) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    navigate("/", { replace: true });
  };

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="auth-intro">
          <p className="eyebrow">Create Account</p>
          <h1>Register to start using DataPulse.</h1>
          <p className="hero-copy">
            New accounts land on the protected post dashboard immediately after signup.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Name</span>
            <input
              className="auth-input"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </label>

          <label className="form-field">
            <span>Email</span>
            <input
              className="auth-input"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="form-field">
            <span>Password</span>
            <input
              className="auth-input"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              required
            />
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <button className="primary-button" type="submit" disabled={submitting}>
            {submitting ? "Creating account..." : "Register"}
          </button>

          <p className="auth-switch">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;
