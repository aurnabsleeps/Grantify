import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("grantifyLoggedIn") === "true" ||
    localStorage.getItem("grantifyAdminLoggedIn") === "true";

  const role =
    localStorage.getItem("grantifyRole") ||
    (localStorage.getItem("grantifyAdminLoggedIn") === "true"
      ? "admin"
      : "student");

  const handleLogout = () => {
    localStorage.removeItem("grantifyLoggedIn");
    localStorage.removeItem("grantifyAdminLoggedIn");
    localStorage.removeItem("grantifyRole");
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/" className="logo" style={{ textDecoration: "none", color: "inherit" }}>
        <span className="logo-icon">◉</span>
        <span>GRANTIFY</span>
      </Link>

      <nav className="home-navbar">
        {!isLoggedIn && (
          <Link to="/" className="active">
            Home
          </Link>
        )}

        {isLoggedIn && role === "student" && (
          <>
            <Link to="/scholarships">Scholarships</Link>
            <Link to="/applications">Application Tracker</Link>
            <Link to="/profile">My Profile</Link>
          </>
        )}

        {isLoggedIn && role === "admin" && (
          <>
            <Link to="/adminanalytics">Admin Analytics</Link>
            <Link to="/admindatamanagement">Admin Data Management</Link>
            <Link to="/adminusermanagement">Admin User</Link>
          </>
        )}
      </nav>

      <div className="header-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="login-link">
              Login
            </Link>

            <Link to="/register" className="contact-btn">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="contact-btn"
            style={{ cursor: "pointer", border: "none" }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
