import React from 'react';
import { SKILL_COUNT } from '../../data/skills';
import { originOf, useIde } from './IdeContext';
import {
  IconAccount,
  IconBranch,
  IconExtensions,
  IconFiles,
  IconMoon,
  IconRun,
  IconSearch,
  IconSun,
} from './icons';

interface ActivityBarProps {
  explorerOpen: boolean;
  onToggleExplorer: () => void;
}

/** 왼쪽 끝 활동 막대. VS Code 의 보기 전환 아이콘을 섹션 바로가기로 쓴다 */
const ActivityBar: React.FC<ActivityBarProps> = ({ explorerOpen, onToggleExplorer }) => {
  const { theme, toggleTheme, openPalette, goToSection } = useIde();

  return (
    <nav className="activitybar" aria-label="활동 막대">
      <button
        type="button"
        className={`ab-btn ${explorerOpen ? 'is-on' : ''}`}
        onClick={onToggleExplorer}
        aria-pressed={explorerOpen}
        aria-label="탐색기 (Ctrl+B)"
        data-tip="탐색기  Ctrl+B"
      >
        <IconFiles size={22} />
      </button>
      <button
        type="button"
        className="ab-btn"
        onClick={openPalette}
        aria-label="검색 (Ctrl+K)"
        data-tip="검색  Ctrl+K"
      >
        <IconSearch size={22} />
      </button>
      <button
        type="button"
        className="ab-btn"
        onClick={() => goToSection('workmap')}
        aria-label="타임라인으로 이동"
        data-tip="타임라인"
      >
        <IconBranch size={22} />
      </button>
      <button
        type="button"
        className="ab-btn"
        onClick={() => goToSection('projects')}
        aria-label="프로젝트로 이동"
        data-tip="프로젝트"
      >
        <IconRun size={21} />
      </button>
      <button
        type="button"
        className="ab-btn"
        onClick={() => goToSection('skills')}
        aria-label={`기술 ${SKILL_COUNT}개로 이동`}
        data-tip="기술 (확장)"
      >
        <IconExtensions size={22} />
        <span className="ab-badge" aria-hidden="true">
          {SKILL_COUNT}
        </span>
      </button>

      <span className="ab-spacer" />

      <button
        type="button"
        className="ab-btn"
        onClick={() => goToSection('profile')}
        aria-label="프로필로 이동"
        data-tip="프로필"
      >
        <IconAccount size={22} />
      </button>
      <button
        type="button"
        className="ab-btn"
        onClick={(e) => toggleTheme(originOf(e))}
        aria-label={theme === 'dark' ? '라이트 테마로 전환' : '다크 테마로 전환'}
        data-tip="테마 전환"
      >
        {theme === 'dark' ? <IconSun size={21} /> : <IconMoon size={21} />}
      </button>
    </nav>
  );
};

export default ActivityBar;
