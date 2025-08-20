import React, { useState } from 'react';
import './Header.css';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h2>Portfolio</h2>
        </div>
        <nav className="nav">
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="메뉴 토글"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#about" onClick={closeMenu}>소개</a></li>
            <li><a href="#profile" onClick={closeMenu}>프로필</a></li>
            <li><a href="#skills" onClick={closeMenu}>스킬</a></li>
            <li><a href="#projects" onClick={closeMenu}>프로젝트</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;