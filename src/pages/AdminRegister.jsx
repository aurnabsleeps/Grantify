import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RoleSelector from "../components/RoleSelector";

function AdminRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("");
    setError(false);

    if (formData.password.length < 6) {
      setError(true);
      setMessage(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (
      formData.password !== formData.confirmPassword
    ) {
      setError(true);
      setMessage("Passwords do not match.");
      return;
    }

    const admin = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };

    localStorage.setItem(
      "grantifyAdmin",
      JSON.stringify(admin)
    );

    localStorage.setItem("grantifyAdminLoggedIn", "true");
    localStorage.setItem("grantifyLoggedIn", "true");
    localStorage.setItem("grantifyRole", "admin");

    setMessage(
      "Admin registration successful! Redirecting..."
    );

    setTimeout(() => {
      navigate("/adminanalytics");
    }, 800);
  };

  return (
    <>
      <Navbar />

      <main className="register-page">
        <div className="register-card">

          <div className="auth-icon">🔐</div>

          <h1>Create Admin Account</h1>

          <p className="auth-subtitle">
            Create an administrator account to manage Grantify.
          </p>

          <RoleSelector />

          <form onSubmit={handleSubmit}>

            <h2 className="section-title">
              Admin Information
            </h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <button
              type="submit"
              className="primary-button"
            >
              Create Admin Account
            </button>

          </form>

          {message && (
            <p
              className={
                error
                  ? "message error-message"
                  : "message success-message"
              }
            >
              {message}
            </p>
          )}

          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>
      </main>
    </>
  );
}

export default AdminRegister;