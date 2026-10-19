import React from 'react';
import { stats } from '../../utils/projectStats';
import { originOf, useIde } from './IdeContext';
import { IconBranch, IconCheck } from './icons';

interface StatusBarProps {
  onDetail: boolean;
}

/**
 * 맨 아래 상태 표시줄.
 * 'Ln 42%' 는 스크립트 없이 CSS 의 스크롤 타임라인과 정수형 @property 로 계산한 스크롤 위치다.
 */
const StatusBar: React.FC<StatusBarProps> = ({ onDetail }) => {
  const { theme, toggleTheme } = useIde();

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="statusbar mono">
      <span className="sb-remote">
        <IconBranch size={13} />
        main
      </span>
      <span className="sb-item">
        <IconCheck size={13} />
        {stats.total} projects
      </span>
      <span className="sb-item sb-wide">
        <span className="sb-dot" aria-hidden="true" />
        {stats.active} active
      </span>

      <span className="sb-spacer" />

      <button type="button" className="sb-item sb-scroll" onClick={toTop} aria-label="맨 위로">
        <span className="sb-scroll-value" />
      </button>
      <span className="sb-item sb-wide">UTF-8</span>
      <span className="sb-item sb-wide">{onDetail ? 'Markdown' : 'TypeScript JSX'}</span>
      <button
        type="button"
        className="sb-item"
        onClick={(e) => toggleTheme(originOf(e))}
        title="테마 전환"
      >
        {theme === 'dark' ? 'Dark Modern' : 'Light Modern'}
      </button>
    </footer>
  );
};

export default StatusBar;
