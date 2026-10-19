import React, { useEffect, useMemo, useRef, useState } from 'react';
import { projects } from '../data/projects';
import { CONTEXT_LABEL, Project } from '../types/Project';
import SectionHeader from './SectionHeader';
import { useIde } from './ide/IdeContext';
import { IconBranch } from './ide/icons';
import './Section.css';
import './WorkMapSection.css';

// 'YYYY-MM' 문자열을 절대 개월 수로 변환 (정렬 및 위치 계산용)
const toMonthIndex = (value: string): number => {
  const [year, month] = value.split('-').map(Number);
  return year * 12 + (month - 1);
};

// 카테고리 표시 순서 및 라벨
const CATEGORY_ORDER: Project['category'][] = [
  'research',
  'hardware',
  'mobile',
  'desktop',
  'web',
  'ai',
  'game',
  'etc',
];

const CATEGORY_LABEL: Record<Project['category'], string> = {
  research: '연구',
  hardware: '하드웨어',
  mobile: '모바일',
  desktop: '데스크톱',
  web: '웹 개발',
  ai: 'AI/ML',
  game: '게임',
  etc: '기타',
};

const STATUS_LABEL: Record<Project['status'], string> = {
  completed: '완료',
  'in-progress': '진행 중',
  planned: '계획',
};

// 'YYYY-MM' -> 'YY.MM'
const shortPeriod = (value: string): string => {
  const [year, month] = value.split('-');
  return `${year.slice(2)}.${month}`;
};

const vars = (v: Record<string, string>) => v as React.CSSProperties;

/**
 * timeline.git: 분야를 브랜치처럼 나눠 프로젝트를 시간순으로 놓은 그래프.
 * 막대에 올리면 뜨는 요약은 CSS 앵커 위치 지정(anchor positioning)으로 막대에 붙는다.
 */
const WorkMapSection: React.FC = () => {
  const { openProject } = useIde();

  // 앵커 위치 지정을 못 쓰는 브라우저는 기본 툴팁(title)으로 대신한다
  const anchorSupported = useMemo(
    () => typeof CSS !== 'undefined' && CSS.supports('anchor-name: --a'),
    []
  );

  const map = useMemo(() => {
    const now = new Date();
    const nowIndex = now.getFullYear() * 12 + now.getMonth();

    // 전체 기간을 연 단위로 맞춰서 눈금과 막대의 기준을 일치시킨다
    const startIndexes = projects.map((p) => toMonthIndex(p.startDate));
    const endIndexes = projects.map((p) => (p.endDate ? toMonthIndex(p.endDate) : nowIndex));

    const minYear = Math.floor(Math.min(...startIndexes) / 12);
    const maxYear = Math.max(Math.floor(Math.max(...endIndexes) / 12), Math.floor(nowIndex / 12));

    const originMonth = minYear * 12;
    const totalMonths = (maxYear - minYear + 1) * 12;
    const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

    const toPercent = (monthIndex: number) => ((monthIndex - originMonth) / totalMonths) * 100;

    const rows = projects.map((project) => {
      const start = toMonthIndex(project.startDate);
      const end = project.endDate ? toMonthIndex(project.endDate) : nowIndex;

      const left = toPercent(start);
      // 종료 월까지 포함해야 하므로 +1개월
      const right = toPercent(Math.max(end, start) + 1);

      return {
        project,
        left,
        width: Math.max(right - left, 1.2),
        // 막대가 오른쪽 끝에 가까우면 라벨을 왼쪽에 붙인다
        labelSide: right > 68 ? ('left' as const) : ('right' as const),
      };
    });

    const groups = CATEGORY_ORDER.map((category) => ({
      category,
      rows: rows
        .filter((row) => row.project.category === category)
        .sort((a, b) => toMonthIndex(a.project.startDate) - toMonthIndex(b.project.startDate)),
    })).filter((group) => group.rows.length > 0);

    return {
      groups,
      years,
      todayPercent: toPercent(nowIndex),
      inProgressCount: projects.filter((p) => p.status === 'in-progress').length,
      completedCount: projects.filter((p) => p.status === 'completed').length,
    };
  }, []);

  // 좁은 화면에서는 차트가 가로로 넘친다. 이때 왼쪽(2021년)부터 보이면
  // 최근 프로젝트가 다 오른쪽에 몰려 있어 첫 화면이 비어 보이므로,
  // 처음엔 오른쪽 끝(현재 시점)을 보여 주고 넘길 수 있다는 안내를 띄운다.
  const scrollRef = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const sync = () => {
      const over = el.scrollWidth > el.clientWidth + 1;
      setOverflowing(over);
      return over;
    };

    if (sync()) el.scrollLeft = el.scrollWidth;

    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  return (
    <section id="workmap" className="section workmap-section">
      <div className="container">
        <SectionHeader
          file="timeline.git"
          kind="git"
          title="타임라인"
          meta={`${map.years[0]}—${map.years[map.years.length - 1]}`}
          lead="분야를 브랜치처럼 나눠 프로젝트를 시간순으로 놓았습니다. 막대에 마우스를 올리면 요약이, 누르면 상세가 열립니다."
        />

        <div className="workmap-legend mono">
          <span className="workmap-legend-item">
            <span className="workmap-swatch completed" />
            merged · 완료 {map.completedCount}
          </span>
          <span className="workmap-legend-item">
            <span className="workmap-swatch in-progress" />
            open · 진행 중 {map.inProgressCount}
          </span>
          <span className="workmap-legend-item">
            <span className="workmap-swatch today" />
            HEAD · 현재
          </span>
          {overflowing && <span className="workmap-hint">← 옆으로 넘기면 이전 프로젝트</span>}
        </div>

        <div className="workmap-scroll card" ref={scrollRef}>
          <div
            className="workmap-chart"
            style={vars({ '--workmap-years': String(map.years.length) })}
          >
            {/* 연도 눈금 */}
            <div className="workmap-row workmap-axis">
              <div className="workmap-row-name" aria-hidden="true" />
              <div className="workmap-axis-track">
                {map.years.map((year) => (
                  <span key={year} className="workmap-axis-year mono">
                    {year}
                  </span>
                ))}
                <span
                  className="workmap-head mono"
                  style={{ left: `${map.todayPercent}%` }}
                  aria-hidden="true"
                >
                  HEAD
                </span>
              </div>
            </div>

            {map.groups.map((group) => (
              <div
                key={group.category}
                className="workmap-group"
                style={vars({ '--lane': `var(--lane-${group.category})` })}
              >
                <h3 className="workmap-group-title">
                  <IconBranch size={14} />
                  <span className="mono">{group.category}</span>
                  <span className="workmap-group-label">{CATEGORY_LABEL[group.category]}</span>
                  <span className="workmap-group-count mono">{group.rows.length}</span>
                </h3>

                {group.rows.map(({ project, left, width, labelSide }) => (
                  <div
                    key={project.id}
                    className="workmap-row"
                    style={vars({ '--anchor': `--wm-${project.id}` })}
                  >
                    <div className="workmap-row-name" title={project.title}>
                      {project.title}
                    </div>

                    <div className="workmap-track">
                      <div
                        className="workmap-today"
                        style={{ left: `${map.todayPercent}%` }}
                        aria-hidden="true"
                      />

                      <button
                        type="button"
                        className={`workmap-bar ${project.status}`}
                        style={{ left: `${left}%`, width: `${width}%` }}
                        onClick={() => openProject(project.id)}
                        title={
                          anchorSupported
                            ? undefined
                            : `${project.title} (${project.startDate} ~ ${project.endDate || '현재'})`
                        }
                      >
                        <span className="workmap-bar-sr">{project.title} 상세 보기</span>
                      </button>

                      <span
                        className={`workmap-bar-label ${labelSide}`}
                        style={
                          labelSide === 'right'
                            ? { left: `${left + width}%` }
                            : { right: `${100 - left}%` }
                        }
                      >
                        <span className="workmap-bar-period mono">
                          {shortPeriod(project.startDate)} ~{' '}
                          {project.endDate ? shortPeriod(project.endDate) : ''}
                        </span>
                        {project.status !== 'completed' && (
                          <span className={`workmap-bar-badge ${project.status}`}>
                            {STATUS_LABEL[project.status]}
                          </span>
                        )}
                      </span>
                    </div>

                    {anchorSupported && (
                      <span className="wm-tip" aria-hidden="true">
                        <span className="wm-tip-title">{project.title}</span>
                        <span className="wm-tip-meta mono">
                          {project.startDate} ~ {project.endDate || '현재'} ·{' '}
                          {CONTEXT_LABEL[project.context]} · {STATUS_LABEL[project.status]}
                        </span>
                        <span className="wm-tip-summary">{project.summary}</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkMapSection;
