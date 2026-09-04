import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { Project } from '../types/Project';
import SectionHeader from './SectionHeader';
import './Section.css';
import './WorkMapSection.css';

interface WorkMapSectionProps {}

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
  'etc',
];

const CATEGORY_LABEL: Record<Project['category'], string> = {
  research: '연구',
  hardware: '하드웨어',
  mobile: '모바일',
  desktop: '데스크톱',
  web: '웹 개발',
  ai: 'AI/ML',
  etc: '기타',
};

const STATUS_LABEL: Record<Project['status'], string> = {
  completed: '완료',
  'in-progress': '제작중',
  planned: '계획중',
};

// 'YYYY-MM' -> 'YY.MM'
const shortPeriod = (value: string): string => {
  const [year, month] = value.split('-');
  return `${year.slice(2)}.${month}`;
};

const WorkMapSection: React.FC<WorkMapSectionProps> = () => {
  const navigate = useNavigate();

  const map = useMemo(() => {
    const now = new Date();
    const nowIndex = now.getFullYear() * 12 + now.getMonth();

    // 전체 기간을 연 단위로 맞춰서 눈금과 막대의 기준을 일치시킨다
    const startIndexes = projects.map((p) => toMonthIndex(p.startDate));
    const endIndexes = projects.map((p) =>
      p.endDate ? toMonthIndex(p.endDate) : nowIndex
    );

    const minYear = Math.floor(Math.min(...startIndexes) / 12);
    const maxYear = Math.max(Math.floor(Math.max(...endIndexes) / 12), Math.floor(nowIndex / 12));

    const originMonth = minYear * 12;
    const totalMonths = (maxYear - minYear + 1) * 12;
    const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

    const toPercent = (monthIndex: number) =>
      ((monthIndex - originMonth) / totalMonths) * 100;

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
        .sort(
          (a, b) =>
            toMonthIndex(a.project.startDate) - toMonthIndex(b.project.startDate)
        ),
    })).filter((group) => group.rows.length > 0);

    return {
      groups,
      years,
      todayPercent: toPercent(nowIndex),
      inProgressCount: projects.filter((p) => p.status === 'in-progress').length,
      completedCount: projects.filter((p) => p.status === 'completed').length,
    };
  }, []);

  const handleSelect = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <section id="workmap" className="section workmap-section">
      <div className="container">
        <SectionHeader
          index="SEC 04"
          title="워크 맵"
          meta={`${map.years[0]}—${map.years[map.years.length - 1]}`}
          lead="지금까지 진행한 프로젝트를 분야별 레인에 시간순으로 배치했습니다. 막대를 누르면 해당 프로젝트의 상세로 이동합니다."
        />

        <div className="workmap-legend">
          <span className="workmap-legend-item">
            <span className="workmap-swatch completed" />
            완료 {map.completedCount}건
          </span>
          <span className="workmap-legend-item">
            <span className="workmap-swatch in-progress" />
            제작중 {map.inProgressCount}건
          </span>
          <span className="workmap-legend-item">
            <span className="workmap-swatch today" />
            현재 시점
          </span>
        </div>

        <div className="workmap-scroll reveal">
          <div
            className="workmap-chart"
            style={{ ['--workmap-years' as string]: map.years.length }}
          >
            {/* 연도 눈금 */}
            <div className="workmap-row workmap-axis">
              <div className="workmap-row-name" aria-hidden="true" />
              <div className="workmap-axis-track">
                {map.years.map((year) => (
                  <span key={year} className="workmap-axis-year">
                    {year}
                  </span>
                ))}
              </div>
            </div>

            {map.groups.map((group) => (
              <div key={group.category} className="workmap-group">
                <h3 className="workmap-group-title">
                  {CATEGORY_LABEL[group.category]}
                  <span className="workmap-group-count">{group.rows.length}</span>
                </h3>

                {group.rows.map(({ project, left, width, labelSide }) => (
                  <div key={project.id} className="workmap-row">
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
                        onClick={() => handleSelect(project.id)}
                        title={`${project.title} (${project.startDate} ~ ${
                          project.endDate || '현재'
                        })`}
                      >
                        <span className="workmap-bar-sr">
                          {project.title} 상세 보기
                        </span>
                      </button>

                      <span
                        className={`workmap-bar-label ${labelSide}`}
                        style={
                          labelSide === 'right'
                            ? { left: `${left + width}%` }
                            : { right: `${100 - left}%` }
                        }
                      >
                        <span className="workmap-bar-period">
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
