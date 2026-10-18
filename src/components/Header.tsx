import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { rememberScroll } from '../utils/scrollMemory';
import CommandPalette from './CommandPalette';
import './Header.css';

interface HeaderProps {}

export const SECTIONS = [
  { id: 'about', label: '소개' },
  { id: 'featured', label: '대표 작업' },
  { id: 'profile', label: '프로필' },
  { id: 'skills', label: '스킬' },
  { id: 'workmap', label: '워크 맵' },
  { id: 'projects', label: '프로젝트' },
  { id: 'contact', label: '연락' },
];

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) section.scrollIntoView({ behavior: 'smooth' });
};

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState('about');
  const [progress, setProgress] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const onMain = location.pathname === '/';

  // 지금 보고 있는 섹션과 스크롤 진행도
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);

      if (!onMain) return;
      // 화면 위에서 35% 지점을 지난 마지막 섹션
      const probe = window.innerHeight * 0.35;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= probe) current = s.id;
      }
      // 맨 아래까지 내리면 마지막 섹션
      if (max > 0 && window.scrollY >= max - 2) current = SECTIONS[SECTIONS.length - 1].id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [onMain, location.pathname]);

  // ⌘K / Ctrl+K, 또는 입력칸 밖에서 '/' 로 빠른 이동 창을 연다
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        !!target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  const closeMenu = () => setIsMenuOpen(false);

  const openProject = (id: string) => {
    closeMenu();
    if (onMain) rememberScroll('/');
    navigate(`/project/${id}`);
  };

  const handleLogoClick = () => {
    closeMenu();
    if (!onMain) {
      navigate('/', { replace: true });
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (sectionId: string) => {
    closeMenu();
    if (!onMain) {
      // 상세 페이지에서는 메인으로 돌아간 뒤 해당 섹션으로
      navigate('/', { replace: true });
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <button type="button" className="logo" onClick={handleLogoClick}>
          <span className="logo-led" aria-hidden="true" />
          <span className="logo-text">YGH / PORTFOLIO</span>
        </button>
        <nav className="nav" aria-label="섹션">
          <button
            type="button"
            className="search-btn"
            onClick={() => setPaletteOpen(true)}
            aria-label="프로젝트 빠르게 찾기"
          >
            <span aria-hidden="true">⌕</span>
            <span className="search-btn-text">찾기</span>
            <kbd>{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          </button>
          <button
            type="button"
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 토글"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  className={onMain && active === s.id ? 'is-active' : ''}
                  aria-current={onMain && active === s.id ? 'true' : undefined}
                  onClick={() => handleNavClick(s.id)}
                >
                  <span className="nav-index">{String(i).padStart(2, '0')}</span>
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        sections={SECTIONS}
        onSection={handleNavClick}
        onProject={openProject}
      />

      {/* 스크롤 진행도: 화면 위쪽을 지나가는 한 줄짜리 트레이스 */}
      <div className="header-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>
  );
};

export default Header;
