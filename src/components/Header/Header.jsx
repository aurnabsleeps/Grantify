import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">

      <div className="logo">
        <span className="logo-icon">◉</span>
        <span>GRANTIFY</span>
      </div>

      <nav className="navbar">

        <Link to="/">
          Home
        </Link>

        <Link to="/scholarships">
          Scholarships
        </Link>

        <Link to="/applications">
          Application Tracker
        </Link>

        {/*<Link to="/about">
          About Us
        </Link>*/}

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

      <button className="contact-btn">
        Log-in
      </button>

    </header>
  );
};

export default Header;