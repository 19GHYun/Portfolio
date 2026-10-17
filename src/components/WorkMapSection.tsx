import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { CONTEXT_LABEL } from '../types/Project';
import SectionHeader from './SectionHeader';
import { rememberScroll } from '../utils/scrollMemory';
import {
  CATEGORY_LABEL,
  STATUS_LABEL,
  byNewest,
  contextColorVar,
  toMonthIndex,
} from '../utils/projectMeta';
import './Section.css';
import './WorkMapSection.css';

interface WorkMapSectionProps {}

// 'YYYY-MM' -> 'YY.MM'
const shortPeriod = (value: string): string => {
  const [year, month] = value.split('-');
  return `${year.slice(2)}.${month}`;
};

const LEGEND: { label: string; color: string }[] = [
  { label: '회사', color: 'var(--ctx-company)' },
  { label: '개인', color: 'var(--ctx-personal)' },
  { label: 'SSAFY', color: 'var(--ctx-ssafy)' },
  { label: '연구실', color: 'var(--ctx-lab)' },
  { label: '학부', color: 'var(--ctx-undergrad)' },
];

const WorkMapSection: React.FC<WorkMapSectionProps> = () => {
  const navigate = useNavigate();

  const map = useMemo(() => {
    const now = new Date();
    const nowIndex = now.getFullYear() * 12 + now.getMonth();

    const spans = projects.map((p) => {
      const start = toMonthIndex(p.startDate);
      const end = p.endDate ? toMonthIndex(p.endDate) : nowIndex;
      return { p, start, end: Math.max(start, end) };
    });

    const minYear = Math.floor(Math.min(...spans.map((s) => s.start)) / 12);
    const maxYear = Math.max(
      Math.floor(Math.max(...spans.map((s) => s.end)) / 12),
      Math.floor(nowIndex / 12)
    );
    const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

    // 연도마다 폭을 다르게: 그 해에 걸친 프로젝트가 많을수록 넓게 (0.55 ~ 1.55)
    const active = years.map(
      (y) => spans.filter((s) => s.start <= y * 12 + 11 && s.end >= y * 12).length
    );
    const peak = Math.max(1, ...active);
    const weights = active.map((n) => 0.55 + n / peak);
    const total = weights.reduce((a, b) => a + b, 0);
    const yearLeft: number[] = [];
    weights.reduce((acc, w, i) => {
      yearLeft[i] = (acc / total) * 100;
      return acc + w;
    }, 0);
    const yearWidth = weights.map((w) => (w / total) * 100);

    // 개월 -> 가로 위치(%)
    const toPercent = (monthIndex: number) => {
      const yi = Math.min(years.length - 1, Math.max(0, Math.floor(monthIndex / 12) - minYear));
      const within = (monthIndex - (minYear + yi) * 12) / 12;
      return yearLeft[yi] + yearWidth[yi] * Math.min(1, Math.max(0, within));
    };

    const rows = [...spans]
      .sort((a, b) => byNewest(a.p, b.p))
      .map(({ p, start, end }) => {
        const left = toPercent(start);
        const right = toPercent(end + 1); // 종료 월까지 포함
        return {
          project: p,
          left,
          width: Math.max(right - left, 1.1),
          labelLeft: right > 76,
        };
      });

    return {
      rows,
      years: years.map((y, i) => ({ year: y, left: yearLeft[i], width: yearWidth[i] })),
      todayPercent: toPercent(nowIndex + now.getDate() / 31),
      inProgressCount: projects.filter((p) => p.status === 'in-progress').length,
      completedCount: projects.filter((p) => p.status === 'completed').length,
      first: years[0],
      last: years[years.length - 1],
    };
  }, []);

  const handleSelect = (projectId: string) => {
    rememberScroll('/');
    navigate(`/project/${projectId}`);
  };

  // 좁은 화면에서는 차트가 가로로 넘친다. 처음엔 오른쪽 끝(현재)을 보여 준다
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
          index="SEC 04"
          title="워크 맵"
          meta={`${map.first}—${map.last}`}
          lead="모든 프로젝트를 한 장의 시간축에 놓았습니다. 색은 어디서 한 작업인지이고, 최근 작업이 위에 있습니다. 프로젝트가 몰린 해일수록 칸이 넓습니다."
        />

        <div className="workmap-legend">
          {LEGEND.map((l) => (
            <span key={l.label} className="workmap-legend-item">
              <span className="workmap-swatch" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
          <span className="workmap-legend-item">
            <span className="workmap-swatch is-progress" />
            진행중 {map.inProgressCount}
          </span>
          <span className="workmap-legend-item">
            <span className="workmap-swatch is-today" />
            현재
          </span>
        </div>

        {overflowing && <p className="workmap-hint k-label">← 옆으로 넘기면 이전 프로젝트</p>}

        <div className="workmap-scroll panel reveal" ref={scrollRef}>
          <div className="workmap-chart">
            {/* 연도 눈금 */}
            <div className="workmap-row workmap-axis">
              <div className="workmap-name mono-label">PROJECT</div>
              <div className="workmap-track">
                {map.years.map((y) => (
                  <span
                    key={y.year}
                    className="workmap-year"
                    style={{ left: `${y.left}%`, width: `${y.width}%` }}
                  >
                    {y.year}
                  </span>
                ))}
              </div>
            </div>

            <div className="workmap-body">
              {/* 연도 칸 배경과 현재 시점 */}
              <div className="workmap-grid" aria-hidden="true">
                {map.years.map((y, i) => (
                  <span
                    key={y.year}
                    className={i % 2 ? 'is-alt' : ''}
                    style={{ left: `${y.left}%`, width: `${y.width}%` }}
                  />
                ))}
                <span className="workmap-today" style={{ left: `${map.todayPercent}%` }} />
              </div>

              {map.rows.map(({ project, left, width, labelLeft }) => (
                <button
                  key={project.id}
                  type="button"
                  className={`workmap-row workmap-item ${project.status}`}
                  style={{ ['--ctx' as string]: contextColorVar(project.context) }}
                  onClick={() => handleSelect(project.id)}
                  title={`${project.title} · ${CONTEXT_LABEL[project.context]} · ${CATEGORY_LABEL[project.category]} · ${STATUS_LABEL[project.status]}`}
                >
                  <span className="workmap-name">
                    <span className="workmap-dot" aria-hidden="true" />
                    <span className="workmap-title">{project.title.split(' - ')[0]}</span>
                  </span>
                  <span className="workmap-track">
                    <span
                      className="workmap-bar"
                      style={{ left: `${left}%`, width: `${width}%` }}
                    />
                    <span
                      className={`workmap-period ${labelLeft ? 'is-left' : ''}`}
                      style={labelLeft ? { right: `${100 - left}%` } : { left: `${left + width}%` }}
                    >
                      {shortPeriod(project.startDate)}
                      {project.endDate
                        ? project.endDate !== project.startDate
                          ? ` — ${shortPeriod(project.endDate)}`
                          : ''
                        : ' — '}
                      {project.status !== 'completed' && <b>{STATUS_LABEL[project.status]}</b>}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkMapSection;
