import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
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
      setMessage(
        "No account found. Please register first."
      );
      return;
    }

    const user = JSON.parse(storedUser);

    if (
      email.trim().toLowerCase() !==
        user.email.trim().toLowerCase() ||
      password !== user.password
    ) {
      setError(true);
      setMessage("Invalid email or password.");
      return;
    }

    localStorage.setItem("grantifyLoggedIn", "true");

    setMessage("Login successful!");

    setTimeout(() => {
      navigate("/profile");
    }, 700);
  };

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <div className="auth-card">

          <div className="auth-icon">🎓</div>

          <h1>Welcome Back</h1>

          <p className="auth-subtitle">
            Sign in to discover and manage your
            scholarship opportunities.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="password-wrapper">
                <input
                  type={
                    showPassword ? "text" : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                Remember me
              </label>

              <button
                type="button"
                className="forgot-button"
                onClick={() =>
                  alert(
                    "Password recovery will be connected to the backend later."
                  )
                }
              >
                Forgot Password?
              </button>
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
            Don't have an account?

            <Link to="/register">
              Create Account
            </Link>
          </p>

        </div>
      </main>
    </>
  );
}

export default Login;