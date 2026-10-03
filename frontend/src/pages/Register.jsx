import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RoleSelector from "../components/RoleSelector";

function Register() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <div className="auth-card">
          <div className="auth-icon">📝</div>

          <h1>Register</h1>

          <p className="auth-subtitle">
            Choose your account type to create an account.
          </p>

          <RoleSelector />

          <div className="auth-footer">
            Already have an account?
            <button
              type="button"
              className="forgot-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Register;