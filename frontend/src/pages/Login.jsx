import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RoleSelector from "../components/RoleSelector";

function Login() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <div className="auth-card">
          <div className="auth-icon">🔐</div>

          <h1>Login</h1>

          <p className="auth-subtitle">
            Choose your account type to continue.
          </p>

          <RoleSelector />

          <div className="auth-footer">
            Don't have an account?
            <button
              type="button"
              className="forgot-button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;