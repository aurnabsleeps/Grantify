import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const loggedIn =
    localStorage.getItem("grantifyLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("grantifyLoggedIn");
    navigate("/login");
  };

  return (
    <header className="auth-navbar">

      <Link to="/login" className="auth-brand">
        <div className="auth-brand-icon">G</div>
        <span>Grantify</span>
      </Link>

      <nav className="auth-nav">

        {!loggedIn && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {loggedIn && (
          <>
            <Link to="/profile">Profile</Link>

            <button
              className="auth-nav-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

      </nav>

    </header>
  );
}

export default Navbar;