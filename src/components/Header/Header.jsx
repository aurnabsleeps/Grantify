import { Link } from "react-router-dom";



const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-icon">◉</span>
        <span>GRANTIFY</span>
      </div>

      <nav className="navbar">
        <Link to="/" className="active">
          Home
        </Link>

        <Link to="/scholarships">
          Scholarships
        </Link>

        <Link to="/applications">
          Application Tracker
        </Link>

        <Link to="/adminanalytics">
          Admin Analytics
        </Link>

        <Link to="/admindatamanagement">
          Admin Data Management
        </Link>

        <Link to="/adminusermanagement">
          Admin User
        </Link>
      </nav>

      <div className="header-buttons">
        <Link to="/login" className="login-link">
          Login
        </Link>

        <Link to="/register" className="contact-btn">
          Register
        </Link>
      </div>
    </header>
  );
};

export default Header;
