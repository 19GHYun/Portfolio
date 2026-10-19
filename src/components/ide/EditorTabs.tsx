import React, { useEffect, useRef } from 'react';
import { projects } from '../../data/projects';
import { projectFile, SECTION_FILES } from '../../data/explorer';
import FileIcon from './FileIcon';
import { useIde } from './IdeContext';
import { IconChevron, IconClose } from './icons';

interface EditorTabsProps {
  activeSection: string | null;
  activeProjectId: string | null;
}

/**
 * 편집기 탭과 그 아래 이동 경로(breadcrumb).
 * 메인에서는 섹션 파일들이 탭으로 열려 있고, 상세에서는 프로젝트 문서 미리 보기 탭이 열린다.
 */
const EditorTabs: React.FC<EditorTabsProps> = ({ activeSection, activeProjectId }) => {
  const { goToSection, backToList } = useIde();
  const stripRef = useRef<HTMLDivElement>(null);
  const project = activeProjectId ? projects.find((p) => p.id === activeProjectId) : null;

  // 좁은 화면에서 탭이 넘칠 때 지금 탭이 보이도록 가로로 맞춘다
  useEffect(() => {
    const strip = stripRef.current;
    const tab = strip?.querySelector<HTMLElement>('.tab.is-active');
    if (!strip || !tab) return;
    const left = tab.offsetLeft - strip.clientWidth / 2 + tab.offsetWidth / 2;
    strip.scrollTo({ left, behavior: 'smooth' });
  }, [activeSection, activeProjectId]);

  const current = SECTION_FILES.find((s) => s.id === activeSection);

  return (
    <div className="editor-head">
      <div className="tabs" ref={stripRef}>
        {project ? (
          <>
            <button type="button" className="tab" onClick={() => goToSection('projects')}>
              <FileIcon kind="folder" />
              <span>projects</span>
            </button>
            <div className="tab is-active is-preview">
              <FileIcon kind="md" />
              <span>
                <span className="tab-prefix">미리 보기 </span>
                {projectFile(project)}
              </span>
              <button
                type="button"
                className="tab-close"
                onClick={backToList}
                aria-label="닫고 목록으로"
                title="닫기"
              >
                <IconClose size={13} />
              </button>
            </div>
          </>
        ) : (
          SECTION_FILES.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`tab ${activeSection === s.id ? 'is-active' : ''}`}
              aria-current={activeSection === s.id ? 'location' : undefined}
              onClick={() => goToSection(s.id)}
            >
              <FileIcon kind={s.kind} />
              <span>{s.file}</span>
            </button>
          ))
        )}
      </div>

      <nav className="crumbs mono" aria-label="현재 위치">
        <span>ygh-portfolio</span>
        <IconChevron size={12} />
        {project ? (
          <>
            <button type="button" onClick={() => goToSection('projects')}>
              projects
            </button>
            <IconChevron size={12} />
            <span className="crumbs-current">{projectFile(project)}</span>
          </>
        ) : (
          <span className="crumbs-current">{current?.file ?? 'README.md'}</span>
        )}
      </nav>
    </div>
  );
};

export default EditorTabs;
