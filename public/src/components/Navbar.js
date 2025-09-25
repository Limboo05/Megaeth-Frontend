import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../theme.css';

function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">MegaETH</div>

      {/* Hamburger */}
      <div className={`navbar-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Links + User (combined for mobile) */}
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
        <Link to="/quiz" onClick={closeMenu}>Quiz</Link>
        <Link to="/leaderboard" onClick={closeMenu}>Leaderboard</Link>

        <div className="navbar-user-mobile">
          {user ? (
            <>
              <span className="username">{user.username}</span>
              <button className="btn" onClick={() => { onLogout(); closeMenu(); }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn" onClick={closeMenu}>
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Desktop-only user section */}
      <div className="navbar-user desktop-only">
        {user ? (
          <>
            <span>{user.username}</span>
            <button className="btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
