import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { projects } from '../data/projects';
import { CONTEXT_LABEL } from '../types/Project';
import { CATEGORY_LABEL, byNewest, contextColorVar } from '../utils/projectMeta';
import './CommandPalette.css';

export interface PaletteSection {
  id: string;
  label: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  sections: PaletteSection[];
  onSection: (id: string) => void;
  onProject: (id: string) => void;
}

type Item =
  | { kind: 'section'; id: string; label: string; hint: string }
  | { kind: 'project'; id: string; label: string; hint: string; color: string };

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, '');

/**
 * ⌘K / Ctrl+K 로 여는 빠른 이동 창.
 * 프로젝트는 제목 · 요약 · 기술 · 맥락으로 찾고, 섹션으로도 바로 갈 수 있다.
 */
const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  sections,
  onSection,
  onProject,
}) => {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const all = useMemo<Item[]>(
    () => [
      ...[...projects].sort(byNewest).map((p) => ({
        kind: 'project' as const,
        id: p.id,
        label: p.title,
        hint: `${CONTEXT_LABEL[p.context]} · ${CATEGORY_LABEL[p.category]} · ${p.startDate.slice(0, 4)}`,
        color: contextColorVar(p.context),
        haystack: norm(
          [p.title, p.summary, CONTEXT_LABEL[p.context], CATEGORY_LABEL[p.category], ...p.technologies].join(' ')
        ),
      })),
      ...sections.map((s) => ({
        kind: 'section' as const,
        id: s.id,
        label: s.label,
        hint: '섹션으로 이동',
        haystack: norm(s.label),
      })),
    ],
    [sections]
  );

  const items = useMemo(() => {
    const q = norm(query);
    if (!q) return all;
    return all.filter((it) => (it as Item & { haystack: string }).haystack.includes(q));
  }, [all, query]);

  // 열 때마다 비우고 입력칸에 커서
  useEffect(() => {
    if (!open) return;
    setQuery('');
    setCursor(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 10);
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  // 고른 줄이 보이도록
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  if (!open) return null;

  const choose = (it: Item | undefined) => {
    if (!it) return;
    onClose();
    if (it.kind === 'project') onProject(it.id);
    else onSection(it.id);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(items.length - 1, c + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(items[cursor]);
    }
  };

  // 헤더의 backdrop-filter 가 fixed 자식의 기준 상자가 되어 버리므로 body 에 바로 그린다
  return createPortal(
    <div
      className="cmdk-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="cmdk panel" role="dialog" aria-modal="true" aria-label="빠른 이동" onKeyDown={onKeyDown}>
        <div className="cmdk-input">
          <span className="cmdk-prompt mono-label" aria-hidden="true">
            &gt;_
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="프로젝트, 기술, 섹션 이름으로 찾기 (예: Python, 마작, 회사)"
            aria-label="찾을 말"
            aria-controls="cmdk-list"
            aria-activedescendant={items[cursor] ? `cmdk-item-${cursor}` : undefined}
          />
          <kbd>ESC</kbd>
        </div>

        <ul className="cmdk-list" id="cmdk-list" role="listbox" ref={listRef}>
          {items.length === 0 && <li className="cmdk-empty">맞는 항목이 없습니다.</li>}
          {items.map((it, i) => (
            <li
              key={`${it.kind}-${it.id}`}
              id={`cmdk-item-${i}`}
              data-index={i}
              role="option"
              aria-selected={i === cursor}
              className={`cmdk-item ${i === cursor ? 'is-on' : ''}`}
              onMouseMove={() => setCursor(i)}
              onClick={() => choose(it)}
            >
              <span
                className={`cmdk-dot ${it.kind}`}
                style={it.kind === 'project' ? { background: it.color } : undefined}
                aria-hidden="true"
              />
              <span className="cmdk-label">{it.label}</span>
              <span className="cmdk-hint">{it.hint}</span>
            </li>
          ))}
        </ul>

        <div className="cmdk-foot mono-label">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> 이동
          </span>
          <span>
            <kbd>ENTER</kbd> 열기
          </span>
          <span className="cmdk-count">{items.length} RESULTS</span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CommandPalette;
