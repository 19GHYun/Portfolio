import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { SECTION_IDS } from '../../data/explorer';
import useActiveSection from '../../hooks/useActiveSection';
import useTheme from '../../hooks/useTheme';
import { recallScroll, rememberScroll } from '../../utils/scrollMemory';
import { transitionTo } from '../../utils/viewTransition';
import ActivityBar from './ActivityBar';
import CommandPalette from './CommandPalette';
import EditorTabs from './EditorTabs';
import Explorer from './Explorer';
import { IdeActions, IdeContext } from './IdeContext';
import Minimap from './Minimap';
import StatusBar from './StatusBar';
import TitleBar from './TitleBar';
import './ide.css';

const WIDE = '(min-width: 1024px)';

/**
 * VS Code 모양 작업 화면 틀.
 * 제목 표시줄 · 활동 막대 · 탐색기 · 편집기 탭 · 상태 표시줄 · 명령 팔레트를 두르고,
 * 가운데 편집기 자리에 페이지(children)를 넣는다.
 */
const IdeLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();

  const detailMatch = matchPath('/project/:id', pathname);
  const activeProjectId = detailMatch?.params.id ?? null;
  const onMain = pathname === '/';

  const activeSection = useActiveSection(SECTION_IDS, onMain);

  const [explorerOpen, setExplorerOpen] = useState(
    () => window.matchMedia(WIDE).matches
  );
  const [paletteOpen, setPaletteOpen] = useState(false);

  // 넓은 화면 ↔ 좁은 화면을 오갈 때 탐색기 기본 상태로 되돌린다
  useEffect(() => {
    const mq = window.matchMedia(WIDE);
    const onChange = () => setExplorerOpen(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // 좁은 화면에서는 무언가를 고르면 서랍을 닫는다
  const closeDrawerIfNarrow = useCallback(() => {
    if (!window.matchMedia(WIDE).matches) setExplorerOpen(false);
  }, []);

  const goToSection = useCallback(
    (id: string) => {
      closeDrawerIfNarrow();
      if (window.location.pathname !== '/') {
        transitionTo(navigate, '/', { replace: true, state: { scrollTo: id } });
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [navigate, closeDrawerIfNarrow]
  );

  const openProject = useCallback(
    (id: string) => {
      closeDrawerIfNarrow();
      if (window.location.pathname === '/') rememberScroll('/');
      transitionTo(navigate, `/project/${id}`);
    },
    [navigate, closeDrawerIfNarrow]
  );

  const backToList = useCallback(() => {
    if (recallScroll('/') !== undefined) {
      transitionTo(navigate, '/', { replace: true, state: { restoreScroll: true } });
      return;
    }
    goToSection('projects');
  }, [navigate, goToSection]);

  const actions = useMemo<IdeActions>(
    () => ({
      theme,
      toggleTheme: toggle,
      openPalette: () => setPaletteOpen(true),
      goToSection,
      openProject,
      backToList,
    }),
    [theme, toggle, goToSection, openProject, backToList]
  );

  // 단축키: Ctrl/⌘+K 또는 / 로 명령 팔레트, Ctrl/⌘+B 로 탐색기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing =
        e.target instanceof HTMLElement &&
        (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
      const mod = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      if (mod && key === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (mod && key === 'b') {
        e.preventDefault();
        setExplorerOpen((v) => !v);
      } else if (!typing && !mod && e.key === '/') {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <IdeContext.Provider value={actions}>
      <div className="ide">
        <a className="skip-link" href="#editor-content">
          본문으로 건너뛰기
        </a>

        <TitleBar onToggleExplorer={() => setExplorerOpen((v) => !v)} />

        <div className={`ide-body ${explorerOpen ? '' : 'no-sidebar'}`}>
          <ActivityBar
            explorerOpen={explorerOpen}
            onToggleExplorer={() => setExplorerOpen((v) => !v)}
          />
          <Explorer
            open={explorerOpen}
            onClose={() => setExplorerOpen(false)}
            activeSection={onMain ? activeSection : null}
            activeProjectId={activeProjectId}
          />

          <div className="editor">
            <EditorTabs
              activeSection={onMain ? activeSection : null}
              activeProjectId={activeProjectId}
            />
            <div className={`editor-main ${onMain ? 'has-minimap' : ''}`}>
              <div className="editor-content" id="editor-content">
                {children}
              </div>
              {onMain && <Minimap />}
            </div>
          </div>
        </div>

        <StatusBar onDetail={!onMain} />
        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      </div>
    </IdeContext.Provider>
  );
};

export default IdeLayout;
