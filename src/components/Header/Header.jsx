const Header = () => {
  return (
    <header className="header">
      
      <div className="logo">
        <span className="logo-icon">◉</span>
        <span>GRANTIFY</span>
      </div>

      <nav className="navbar">
        <a href="#" className="active">Home</a>
        <a href="#">Services</a>
        <a href="#">About Us</a>
        <a href="#">Case Studies</a>
        <a href="#">Blog</a>
      </nav>

      <button className="contact-btn">
        Contact
      </button>

    </header>
  );
};

export default Header;