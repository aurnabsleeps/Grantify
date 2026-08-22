import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">

      <div className="logo">
        <span className="logo-icon">◉</span>
        <span>GRANTIFY</span>
      </div>

      <nav className="home-navbar">

        <Link to="/" className="active">
          Home
        </Link>

        <a href="#">Services</a>

        <a href="#">About Us</a>

        <a href="#">Case Studies</a>

        <a href="#">Blog</a>

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

