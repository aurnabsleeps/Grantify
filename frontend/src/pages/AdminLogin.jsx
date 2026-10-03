import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import RoleSelector from "../components/RoleSelector";
import { loginUser } from "../api";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError(false);
    setLoading(true);

    try {
      const data = await loginUser({
        email: email.trim().toLowerCase(),
        password,
        role: "admin",
      });

      localStorage.setItem("grantifyAdmin", JSON.stringify(data.user));
      localStorage.setItem("grantifyUser", JSON.stringify(data.user));
      if (data.token) {
        localStorage.setItem("grantifyToken", data.token);
      }
      localStorage.setItem("grantifyAdminLoggedIn", "true");
      localStorage.setItem("grantifyLoggedIn", "true");
      localStorage.setItem("grantifyRole", "admin");

      setMessage("Admin login successful!");

      setTimeout(() => {
        navigate("/adminanalytics");
      }, 700);
    } catch (err) {
      setError(true);
      setMessage(err.message || "Cannot connect to server. Please ensure backend is running.");
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
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