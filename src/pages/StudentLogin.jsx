import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import RoleSelector from "../components/RoleSelector";

function StudentLogin() {
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

    const storedUser = localStorage.getItem("grantifyUser");

    if (!storedUser) {
      setError(true);
      setMessage("No account found. Please register first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (
      email.trim().toLowerCase() !== user.email.trim().toLowerCase() ||
      password !== user.password
    ) {
      setError(true);
      setMessage("Invalid email or password.");
      return;
    }

    localStorage.setItem("grantifyLoggedIn", "true");
    localStorage.setItem("grantifyRole", "student");

    setMessage("Login successful!");

    setTimeout(() => {
      navigate("/scholarships");
    }, 700);
  };

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <div className="auth-card">

          <div className="auth-icon">🎓</div>

          <h1>Student Login</h1>

          <p className="auth-subtitle">
            Sign in to discover and manage your scholarship opportunities.
          </p>

          <RoleSelector />

          <form onSubmit={handleSubmit} className="login-form">

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
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
                  placeholder="Enter your password"
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
            <Link to="/register">
              Create Account
            </Link>
          </p>

        </div>
      </main>
    </>
  );
}

export default StudentLogin;