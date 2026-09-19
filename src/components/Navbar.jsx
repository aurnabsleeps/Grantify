import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="auth-navbar">
      <Link to="/" className="auth-brand" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="auth-brand-icon">G</div>
        <span>Grantify</span>
      </Link>
    </header>
  );
}

export default Navbar;