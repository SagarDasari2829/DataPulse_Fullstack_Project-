import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const redirectTo = location.state?.from?.pathname || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const result = await login(form);

    if (result.error) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    navigate(redirectTo, { replace: true });
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
          <p className="eyebrow">Welcome Back</p>
          <h1>Sign in to access DataPulse.</h1>
          <p className="hero-copy">
            Authentication keeps the post dashboard private, and authorization controls which users can open protected screens.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
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
            {submitting ? "Signing in..." : "Login"}
          </button>

          <p className="auth-switch">
            Need an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;
