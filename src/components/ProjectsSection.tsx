import React, { useMemo, useState } from 'react';
import { projects } from '../data/projects';
import { projectFile } from '../data/explorer';
import { CONTEXT_LABEL, Project } from '../types/Project';
import { getProjectImages } from '../utils/projectImages';
import ProjectCover from './ProjectCover';
import SectionHeader from './SectionHeader';
import FileIcon from './ide/FileIcon';
import { useIde } from './ide/IdeContext';
import './Section.css';
import './ProjectsSection.css';

const STATUS_TEXT: Record<Project['status'], string> = {
  completed: '완료',
  'in-progress': '진행 중',
  planned: '계획',
};

const CATEGORY_TEXT: Record<Project['category'], string> = {
  web: 'web',
  mobile: 'mobile',
  desktop: 'desktop',
  ai: 'ai',
  research: 'research',
  etc: 'etc',
  hardware: 'hardware',
  game: 'game',
};

type SortKey = 'featured' | 'date-desc' | 'date-asc';
type FilterKey = 'all' | Project['category'];

// 정렬 버튼을 누를 때마다 다음 방식으로 넘어간다
const SORT_NEXT: Record<SortKey, SortKey> = {
  featured: 'date-desc',
  'date-desc': 'date-asc',
  'date-asc': 'featured',
};

const SORT_LABEL: Record<SortKey, string> = {
  featured: '대표 먼저',
  'date-desc': '최신순',
  'date-asc': '오래된순',
};

const startOf = (p: Project) => new Date(`${p.startDate}-01`).getTime();

const vars = (v: Record<string, string>) => v as React.CSSProperties;

// 카드 위 커서를 따라다니는 은은한 조명
const spotlight = (e: React.PointerEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

const ProjectsSection: React.FC = () => {
  const { openProject } = useIde();
  const [sortBy, setSortBy] = useState<SortKey>('featured');
  const [filter, setFilter] = useState<FilterKey>('all');

  // 실제로 존재하는 카테고리만 필터 버튼으로 노출한다
  const categories = useMemo(() => {
    const counts = new Map<Project['category'], number>();
    projects.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
    return (Object.keys(CATEGORY_TEXT) as Project['category'][])
      .filter((c) => counts.has(c))
      .map((c) => ({ key: c, count: counts.get(c) ?? 0 }));
  }, []);

  const visible = useMemo(() => {
    const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

    return [...filtered].sort((a, b) => {
      if (sortBy === 'date-asc') return startOf(a) - startOf(b);
      // 기본(대표 먼저): 대표 프로젝트를 앞에 두고, 그 안에서는 최신순
      if (sortBy === 'featured' && Boolean(a.featured) !== Boolean(b.featured)) {
        return a.featured ? -1 : 1;
      }
      return startOf(b) - startOf(a);
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
          file="projects/"
          kind="folder"
          title="프로젝트"
          meta={`${projects.length} files`}
          lead="연구실에서 시작해 실무까지 이어진 작업들입니다. 카드를 누르면 문제와 해결 과정, 실측 결과까지 볼 수 있습니다."
        />

        <div className="proj-toolbar">
          <div className="proj-filters" role="group" aria-label="분야 필터">
            <button
              type="button"
              className={`proj-filter ${filter === 'all' ? 'is-on' : ''}`}
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              전체 <span className="proj-filter-count">{projects.length}</span>
            </button>
            {categories.map(({ key, count }) => (
              <button
                key={key}
                type="button"
                className={`proj-filter mono ${filter === key ? 'is-on' : ''}`}
                aria-pressed={filter === key}
                style={vars({ '--lane': `var(--lane-${key})` })}
                onClick={() => setFilter(key)}
              >
                <span className="proj-filter-dot" aria-hidden="true" />
                {CATEGORY_TEXT[key]}
                <span className="proj-filter-count">{count}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="proj-sort"
            onClick={() => setSortBy((s) => SORT_NEXT[s])}
            aria-label={`정렬 바꾸기, 지금은 ${SORT_LABEL[sortBy]}`}
          >
            <span className="mono proj-sort-key">sort:</span> {SORT_LABEL[sortBy]}
          </button>
        </div>

        <p className="proj-count mono" aria-live="polite">
          {visible.length} / {projects.length} files
        </p>

        <div className="proj-grid">
          {visible.map((project) => {
            const thumb = thumbOf(project);

            return (
              <article
                key={project.id}
                className={`proj-card card ${project.featured ? 'is-featured' : ''}`}
                style={vars({ '--lane': `var(--lane-${project.category})` })}
                onClick={() => openProject(project.id)}
                onPointerMove={spotlight}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProject(project.id);
                  }
                }}
                role="link"
                tabIndex={0}
                aria-label={`${project.title} 상세 보기`}
              >
                <div className="proj-head mono">
                  <FileIcon kind="md" />
                  <span className="proj-file">{projectFile(project)}</span>
                  {project.featured && <span className="proj-pin">★ 대표</span>}
                </div>

                {/* 대표 이미지 또는 생성된 파형 */}
                <div className="proj-visual">
                  {thumb ? (
                    <img src={thumb} alt="" loading="lazy" />
                  ) : (
                    <ProjectCover project={project} height={110} />
                  )}
                </div>

                <div className="proj-body">
                  <div className="proj-tags">
                    <span className={`proj-context ${project.context}`}>
                      {CONTEXT_LABEL[project.context]}
                    </span>
                    <span className="proj-cat mono">{CATEGORY_TEXT[project.category]}</span>
                    <span className={`proj-status ${project.status}`}>
                      <span className="proj-status-dot" aria-hidden="true" />
                      {STATUS_TEXT[project.status]}
                    </span>
                  </div>

                  <h3
                    className="proj-title"
                    style={vars({ '--vt': `proj-title-${project.id}` })}
                  >
                    {project.title}
                  </h3>
                  <p className="proj-summary">{project.summary}</p>

                  {project.metrics && project.metrics.length > 0 && (
                    <dl className="proj-metrics mono">
                      {project.metrics.slice(0, 3).map((m) => (
                        <div key={m.label} className="proj-metric">
                          <dt>{m.label}</dt>
                          <dd>{m.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <div className="proj-tech">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="tech-tag mono">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="tech-more mono">+{project.technologies.length - 4}</span>
                    )}
                  </div>
                </div>

                <div className="proj-foot mono">
                  <span>
                    {project.startDate} → {project.endDate || '현재'}
                  </span>
                  <span>{project.teamSize === 1 ? '단독' : `${project.teamSize}인`}</span>
                  <span className="proj-go">열기 →</span>
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
