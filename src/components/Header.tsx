import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    closeMenu();

    // 현재 프로젝트 상세 페이지에 있는지 확인
    if (location.pathname.startsWith('/project/')) {
      // 메인 페이지로 이동한 후 맨 위로 스크롤
      navigate('/', { replace: true });
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      // 이미 메인 페이지에 있으면 바로 맨 위로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (sectionId: string) => {
    closeMenu();

    // 현재 프로젝트 상세 페이지에 있는지 확인
    if (location.pathname.startsWith('/project/')) {
      // 메인 페이지로 이동한 후 해당 섹션으로 스크롤
      navigate('/', { replace: true });
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // 이미 메인 페이지에 있으면 바로 스크롤
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="header">
      <div className="container">
        <button type="button" className="logo" onClick={handleLogoClick}>
          <span className="logo-led" aria-hidden="true" />
          <span className="logo-text">YGH / PORTFOLIO</span>
        </button>
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
            <li><button onClick={() => handleNavClick('about')}>01 소개</button></li>
            <li><button onClick={() => handleNavClick('profile')}>02 프로필</button></li>
            <li><button onClick={() => handleNavClick('skills')}>03 스킬</button></li>
            <li><button onClick={() => handleNavClick('workmap')}>04 워크맵</button></li>
            <li><button onClick={() => handleNavClick('projects')}>05 프로젝트</button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;