import React from 'react';
import { orderedProjects, projectFile, SECTION_FILES } from '../../data/explorer';
import FileIcon from './FileIcon';
import { useIde } from './IdeContext';
import { IconChevron } from './icons';

interface ExplorerProps {
  open: boolean;
  onClose: () => void;
  /** 메인 페이지에서 지금 보고 있는 섹션 */
  activeSection: string | null;
  /** 상세 페이지에서 열려 있는 프로젝트 */
  activeProjectId: string | null;
}

const depth = (n: number) => ({ ['--depth' as string]: n });

/**
 * 탐색기 사이드바. 섹션은 파일, 프로젝트는 projects 폴더 안 문서로 보여 준다.
 * 넓은 화면에서는 붙박이, 좁은 화면에서는 왼쪽에서 밀려 나오는 서랍이 된다.
 */
const Explorer: React.FC<ExplorerProps> = ({
  open,
  onClose,
  activeSection,
  activeProjectId,
}) => {
  const { goToSection, openProject } = useIde();
  const files = SECTION_FILES.filter((s) => s.kind !== 'folder');

  return (
    <>
      <aside className={`explorer ${open ? 'is-open' : ''}`} aria-label="탐색기">
        <div className="ex-title">탐색기</div>

        <details className="ex-group" open>
          <summary className="ex-group-head">
            <IconChevron size={14} className="ex-chevron" />
            YGH-PORTFOLIO
          </summary>

          <ul className="ex-tree">
            {files.map((s) => {
              const active = activeSection === s.id;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    className={`ex-item ${active ? 'is-active' : ''}`}
                    style={depth(1)}
                    aria-current={active ? 'location' : undefined}
                    onClick={() => goToSection(s.id)}
                    title={s.label}
                  >
                    <FileIcon kind={s.kind} />
                    <span className="ex-name">{s.file}</span>
                  </button>
                </li>
              );
            })}

            <li>
              <details className="ex-folder" open>
                <summary
                  className={`ex-item ${activeSection === 'projects' ? 'is-active' : ''}`}
                  style={depth(1)}
                >
                  <IconChevron size={14} className="ex-chevron" />
                  <span className="ex-name">projects</span>
                  <span className="ex-count">{orderedProjects.length}</span>
                </summary>

                <ul>
                  {orderedProjects.map((p) => {
                    const active = activeProjectId === p.id;
                    return (
                      <li key={p.id}>
                        <button
                          type="button"
                          className={`ex-item ${active ? 'is-active' : ''} ${
                            p.status === 'in-progress' ? 'is-modified' : ''
                          }`}
                          style={depth(2)}
                          aria-current={active ? 'page' : undefined}
                          onClick={() => openProject(p.id)}
                          title={p.title}
                        >
                          <FileIcon kind="md" />
                          <span className="ex-name">{projectFile(p)}</span>
                          {p.featured && (
                            <span className="ex-star" aria-label="대표">
                              ★
                            </span>
                          )}
                          {p.status === 'in-progress' && (
                            <span className="ex-git" aria-label="진행 중">
                              M
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          </ul>
        </details>

        <div className="ex-legend mono" aria-hidden="true">
          <span>
            <b className="ex-star">★</b> 대표
          </span>
          <span>
            <b className="ex-git">M</b> 진행 중
          </span>
        </div>
      </aside>

      <button
        type="button"
        className={`ex-backdrop ${open ? 'is-open' : ''}`}
        onClick={onClose}
        aria-label="탐색기 닫기"
        tabIndex={open ? 0 : -1}
      />
    </>
  );
};

export default Explorer;
