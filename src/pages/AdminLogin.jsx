import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import RoleSelector from "../components/RoleSelector";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("");
    setError(false);

    const storedAdmin = localStorage.getItem("grantifyAdmin");

    if (!storedAdmin) {
      setError(true);
      setMessage("No admin account found.");
      return;
    }

    const admin = JSON.parse(storedAdmin);

    if (
      email.trim().toLowerCase() !== admin.email.trim().toLowerCase() ||
      password !== admin.password
    ) {
      setError(true);
      setMessage("Invalid admin email or password.");
      return;
    }

    localStorage.setItem("grantifyAdminLoggedIn", "true");

    setMessage("Admin login successful!");

    setTimeout(() => {
      navigate("/adminanalytics");
    }, 700);
  };

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <div className="auth-card">

          <div className="auth-icon">🔐</div>

          <h1>Admin Login</h1>

          <p className="auth-subtitle">
            Sign in to manage Grantify.
          </p>

          <RoleSelector />

          <form onSubmit={handleSubmit} className="login-form">

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter admin email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter admin password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="primary-button"
            >
              Login
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
            Don't have an account?{" "}
            <Link to="/admin-register">
              Create Admin Account
            </Link>
          </p>

        </div>
      </main>
    </>
  );
}

export default AdminLogin;