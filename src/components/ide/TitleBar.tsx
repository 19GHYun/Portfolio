import React from 'react';
import { SECTION_FILES } from '../../data/explorer';
import { isMac, originOf, useIde } from './IdeContext';
import { IconGithub, IconMenu, IconMoon, IconSearch, IconSun } from './icons';

interface TitleBarProps {
  onToggleExplorer: () => void;
}

/** 맨 위 제목 표시줄: 섹션 메뉴, 가운데 명령 센터(검색), 테마 · GitHub */
const TitleBar: React.FC<TitleBarProps> = ({ onToggleExplorer }) => {
  const { theme, toggleTheme, openPalette, goToSection } = useIde();
  const mod = isMac() ? '⌘' : 'Ctrl';

  return (
    <header className="titlebar">
      <button
        type="button"
        className="tb-icon-btn tb-menu"
        onClick={onToggleExplorer}
        aria-label="탐색기 열기"
      >
        <IconMenu size={18} />
      </button>

      <button type="button" className="tb-brand" onClick={() => goToSection('about')}>
        <span className="tb-logo" aria-hidden="true">
          {'{ }'}
        </span>
        <span className="tb-name mono">ygh-portfolio</span>
      </button>

      <nav className="tb-nav" aria-label="섹션 메뉴">
        {SECTION_FILES.filter((s) => s.id !== 'about').map((s) => (
          <button key={s.id} type="button" onClick={() => goToSection(s.id)}>
            {s.label}
          </button>
        ))}
      </nav>

      <button type="button" className="tb-command" onClick={openPalette}>
        <IconSearch size={14} />
        <span className="tb-command-text">프로젝트, 섹션, 명령 검색</span>
        <span className="tb-command-keys" aria-hidden="true">
          <kbd>{mod}</kbd>
          <kbd>K</kbd>
        </span>
      </button>

      <div className="tb-actions">
        <button
          type="button"
          className="tb-icon-btn"
          onClick={(e) => toggleTheme(originOf(e))}
          aria-label={theme === 'dark' ? '라이트 테마로 전환' : '다크 테마로 전환'}
          title={theme === 'dark' ? '라이트 테마로 전환' : '다크 테마로 전환'}
        >
          {theme === 'dark' ? <IconSun size={17} /> : <IconMoon size={17} />}
        </button>
        <a
          className="tb-icon-btn"
          href="https://github.com/19GHYun"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub (새 창)"
          title="GitHub"
        >
          <IconGithub size={17} />
        </a>
      </div>
    </header>
  );
};

export default TitleBar;
