import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CONTEXT_LABEL } from '../../types/Project';
import { orderedProjects, projectFile, SECTION_FILES } from '../../data/explorer';
import FileIcon from './FileIcon';
import { useIde } from './IdeContext';
import { IconCommand, IconGithub, IconMail, IconMoon, IconSearch, IconSun } from './icons';

// 검색어로 쓸 수 있는 한글 분류 이름
const CATEGORY_KO: Record<string, string> = {
  research: '연구',
  hardware: '하드웨어',
  mobile: '모바일 앱',
  desktop: '데스크톱 앱',
  web: '웹',
  ai: '인공지능 AI',
  game: '게임',
  etc: '기타',
};

const STATUS_KO: Record<string, string> = {
  completed: '완료',
  'in-progress': '진행 중 진행중',
  planned: '계획',
};

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

interface Item {
  key: string;
  group: string;
  label: string;
  detail?: string;
  /** 검색에만 쓰는 추가 단어 */
  keywords?: string;
  icon: React.ReactNode;
  run: () => void;
}

/**
 * 명령 팔레트 (Ctrl+K).
 * 네이티브 <dialog> 를 써서 포커스 가두기와 Esc 닫기를 브라우저에 맡기고,
 * 열고 닫히는 모습은 CSS 의 @starting-style 로 처리한다.
 */
const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const { theme, toggleTheme, goToSection, openProject } = useIde();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);

  const items = useMemo<Item[]>(
    () => [
      ...SECTION_FILES.map((s) => ({
        key: `sec-${s.id}`,
        group: '섹션으로 이동',
        label: s.file,
        detail: s.label,
        icon: <FileIcon kind={s.kind} />,
        run: () => goToSection(s.id),
      })),
      ...orderedProjects.map((p) => ({
        key: `prj-${p.id}`,
        group: '프로젝트 열기',
        label: p.title,
        detail: `projects/${projectFile(p)}`,
        keywords: `${p.technologies.join(' ')} ${CONTEXT_LABEL[p.context]} ${p.category} ${
          CATEGORY_KO[p.category] ?? ''
        } ${STATUS_KO[p.status] ?? ''} ${p.featured ? '대표' : ''}`,
        icon: <FileIcon kind="md" />,
        run: () => openProject(p.id),
      })),
      {
        key: 'cmd-theme',
        group: '명령',
        label: theme === 'dark' ? '테마: 라이트로 전환' : '테마: 다크로 전환',
        keywords: 'theme dark light 테마 다크 라이트',
        icon: theme === 'dark' ? <IconSun size={15} /> : <IconMoon size={15} />,
        run: () => toggleTheme(),
      },
      {
        key: 'cmd-github',
        group: '명령',
        label: 'GitHub 열기',
        detail: 'github.com/19GHYun',
        icon: <IconGithub size={15} />,
        run: () => window.open('https://github.com/19GHYun', '_blank', 'noopener'),
      },
      {
        key: 'cmd-mail',
        group: '명령',
        label: '메일 보내기',
        detail: 'zxcvting1@gmail.com',
        icon: <IconMail size={15} />,
        run: () => {
          window.location.href = 'mailto:zxcvting1@gmail.com';
        },
      },
    ],
    [theme, toggleTheme, goToSection, openProject]
  );

  const filtered = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return items;
    return items.filter((item) => {
      const hay = `${item.label} ${item.detail ?? ''} ${item.keywords ?? ''}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [items, query]);

  // 열고 닫기
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery('');
      setCursor(0);
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  // 키보드로 고른 항목이 목록 밖으로 나가지 않게
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  const choose = (item: Item | undefined) => {
    if (!item) return;
    onClose();
    // 대화상자가 닫히고 포커스가 돌아간 다음 실행해야 스크롤 이동이 끊기지 않는다
    window.setTimeout(() => item.run(), 0);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(filtered[cursor]);
    }
  };

  const highlight = (text: string) => {
    const t = query.trim().split(/\s+/)[0];
    if (!t) return text;
    const i = text.toLowerCase().indexOf(t.toLowerCase());
    if (i < 0) return text;
    return (
      <>
        {text.slice(0, i)}
        <mark>{text.slice(i, i + t.length)}</mark>
        {text.slice(i + t.length)}
      </>
    );
  };

  let lastGroup = '';

  return (
    <dialog
      ref={dialogRef}
      className="palette"
      aria-label="명령 팔레트"
      onClose={onClose}
      onMouseDown={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="pl-box">
        <div className="pl-input-row">
          <IconSearch size={15} />
          <input
            ref={inputRef}
            className="pl-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="프로젝트 이름, 기술, 섹션으로 검색 (예: Python, 회사, 타임라인)"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={filtered[cursor] ? `pl-${filtered[cursor].key}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <ul className="pl-list" id="palette-list" role="listbox" ref={listRef}>
          {filtered.length === 0 && <li className="pl-empty">일치하는 항목이 없습니다</li>}
          {filtered.map((item, index) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <React.Fragment key={item.key}>
                {showGroup && (
                  <li className="pl-group" role="presentation">
                    {item.group}
                  </li>
                )}
                <li
                  id={`pl-${item.key}`}
                  role="option"
                  aria-selected={index === cursor}
                  data-index={index}
                  className={`pl-item ${index === cursor ? 'is-cursor' : ''}`}
                  onMouseMove={() => setCursor(index)}
                  onClick={() => choose(item)}
                >
                  <span className="pl-icon">{item.icon}</span>
                  <span className="pl-label">{highlight(item.label)}</span>
                  {item.detail && <span className="pl-detail mono">{item.detail}</span>}
                </li>
              </React.Fragment>
            );
          })}
        </ul>

        <div className="pl-foot mono">
          <span>
            <IconCommand size={13} /> 명령 팔레트
          </span>
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> 이동 <kbd>Enter</kbd> 열기 <kbd>Esc</kbd> 닫기
          </span>
        </div>
      </div>
    </dialog>
  );
};

export default CommandPalette;
