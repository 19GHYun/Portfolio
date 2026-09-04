import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { Project } from '../types/Project';
import { getProjectImages } from '../utils/projectImages';
import ProjectCover from './ProjectCover';
import SectionHeader from './SectionHeader';
import './Section.css';
import './ProjectsSection.css';

interface ProjectsSectionProps {}

const STATUS_TEXT: Record<Project['status'], string> = {
  completed: '완료',
  'in-progress': '진행중',
  planned: '계획',
};

const CATEGORY_TEXT: Record<Project['category'], string> = {
  web: 'WEB',
  mobile: 'MOBILE',
  desktop: 'DESKTOP',
  ai: 'AI/ML',
  research: 'RESEARCH',
  etc: 'ETC',
  hardware: 'HARDWARE',
};

type SortKey = 'date-desc' | 'date-asc';
type FilterKey = 'all' | Project['category'];

const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortKey>('date-desc');
  const [filter, setFilter] = useState<FilterKey>('all');

  // 실제로 존재하는 카테고리만 필터 버튼으로 노출한다
  const categories = useMemo(() => {
    const present = new Set(projects.map((p) => p.category));
    return (Object.keys(CATEGORY_TEXT) as Project['category'][]).filter((c) =>
      present.has(c)
    );
  }, []);

  const visible = useMemo(() => {
    const filtered =
      filter === 'all'
        ? projects
        : projects.filter((p) => p.category === filter);

    return [...filtered].sort((a, b) => {
      const da = new Date(`${a.startDate}-01`).getTime();
      const db = new Date(`${b.startDate}-01`).getTime();
      return sortBy === 'date-desc' ? db - da : da - db;
    });
  }, [filter, sortBy]);

  // 대표 이미지가 있으면 쓰고, 없으면 파형 커버로 대신한다
  const thumbOf = (project: Project): string | null => {
    if (project.images && project.images.length > 0) return project.images[0];
    const auto = getProjectImages(project.id);
    return auto.length > 0 ? auto[0].src : null;
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          index="SEC 05"
          title="프로젝트"
          meta={`${visible.length} / ${projects.length} ENTRIES`}
          lead="연구실에서 시작해 실무까지 이어진 작업들입니다. 카드를 누르면 문제와 해결 과정, 실측 결과까지 볼 수 있습니다."
        />

        {/* 필터 바 */}
        <div className="proj-controls">
          <div className="proj-filters" role="group" aria-label="분야 필터">
            <button
              type="button"
              className={`proj-filter ${filter === 'all' ? 'is-on' : ''}`}
              onClick={() => setFilter('all')}
            >
              ALL
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`proj-filter ${filter === c ? 'is-on' : ''}`}
                onClick={() => setFilter(c)}
              >
                {CATEGORY_TEXT[c]}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="proj-sort"
            onClick={() =>
              setSortBy((s) => (s === 'date-desc' ? 'date-asc' : 'date-desc'))
            }
          >
            {sortBy === 'date-desc' ? '최신순 ↓' : '오래된순 ↑'}
          </button>
        </div>

        <div className="proj-grid">
          {visible.map((project) => {
            const thumb = thumbOf(project);
            const isActive = project.status === 'in-progress';

            return (
              <article
                key={project.id}
                className="proj-card panel reveal"
                onClick={() => navigate(`/project/${project.id}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/project/${project.id}`);
                  }
                }}
                role="link"
                tabIndex={0}
              >
                {/* 상단 바: 번호 / 분야 / 상태 */}
                <div className="proj-card-bar">
                  <span className="proj-id">
                    {project.id.padStart(2, '0')}
                  </span>
                  <span className="mono-label">
                    {CATEGORY_TEXT[project.category]}
                  </span>
                  <span className={`proj-status ${project.status}`}>
                    <span
                      className={`led ${isActive ? 'active' : 'done'}`}
                      aria-hidden="true"
                    />
                    {STATUS_TEXT[project.status]}
                  </span>
                </div>

                {/* 대표 이미지 또는 생성된 파형 */}
                <div className="proj-visual">
                  {thumb ? (
                    <img src={thumb} alt="" loading="lazy" />
                  ) : (
                    <ProjectCover project={project} height={96} />
                  )}
                </div>

                <div className="proj-body">
                  <h3 className="proj-title">{project.title}</h3>
                  <p className="proj-summary">{project.summary}</p>

                  {project.metrics && project.metrics.length > 0 && (
                    <dl className="proj-metrics">
                      {project.metrics.slice(0, 3).map((m) => (
                        <div key={m.label} className="proj-metric">
                          <dt className="mono-label">{m.label}</dt>
                          <dd className="readout">{m.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <div className="proj-tech">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="tech-more">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="proj-card-foot">
                  <span className="readout-sm">
                    {project.startDate} — {project.endDate || '현재'}
                  </span>
                  <span className="readout-sm">
                    {project.teamSize === 1 ? '단독' : `${project.teamSize}인`}
                  </span>
                  <span className="proj-go">자세히 →</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
