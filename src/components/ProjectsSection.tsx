import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { findSkill, projectsUsing } from '../data/skills';
import { Project, ProjectContext } from '../types/Project';
import { CATEGORY_CODE, CATEGORY_ORDER, byNewest } from '../utils/projectMeta';
import { rememberScroll } from '../utils/scrollMemory';
import ProjectCard from './ProjectCard';
import SectionHeader from './SectionHeader';
import './Section.css';
import './ProjectsSection.css';

interface ProjectsSectionProps {
  /** 스킬 섹션에서 고른 기술 */
  tech: string | null;
  onClearTech: () => void;
}

// 맥락 필터. 학부 · 연구실 프로젝트는 '연구실'과 '학부' 양쪽에 다 잡힌다
const CONTEXT_FILTERS: { key: string; label: string; color: string; has: ProjectContext[] }[] = [
  { key: 'company', label: '회사', color: 'var(--ctx-company)', has: ['company'] },
  { key: 'personal', label: '개인', color: 'var(--ctx-personal)', has: ['personal'] },
  { key: 'ssafy', label: 'SSAFY', color: 'var(--ctx-ssafy)', has: ['ssafy'] },
  { key: 'lab', label: '연구실', color: 'var(--ctx-lab)', has: ['lab', 'undergrad-lab'] },
  { key: 'undergrad', label: '학부', color: 'var(--ctx-undergrad)', has: ['undergrad', 'undergrad-lab'] },
];

type SortKey = 'newest' | 'oldest';

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ tech, onClearTech }) => {
  const navigate = useNavigate();
  const [ctx, setCtx] = useState<string>('all');
  const [category, setCategory] = useState<'all' | Project['category']>('all');
  const [sortBy, setSortBy] = useState<SortKey>('newest');

  const skill = tech ? findSkill(tech) : undefined;

  // 실제로 존재하는 분야만 버튼으로 노출한다
  const categories = useMemo(() => {
    const present = new Set(projects.map((p) => p.category));
    return CATEGORY_ORDER.filter((c) => present.has(c));
  }, []);

  const visible = useMemo(() => {
    const ctxFilter = CONTEXT_FILTERS.find((f) => f.key === ctx);
    const techSet = skill ? new Set(projectsUsing(skill).map((p) => p.id)) : null;
    const list = projects.filter(
      (p) =>
        (!ctxFilter || ctxFilter.has.includes(p.context)) &&
        (category === 'all' || p.category === category) &&
        (!techSet || techSet.has(p.id))
    );
    list.sort(byNewest);
    if (sortBy === 'oldest') list.reverse();
    return list;
  }, [ctx, category, sortBy, skill]);

  const countFor = (has: ProjectContext[]) => projects.filter((p) => has.includes(p.context)).length;

  const openProject = (id: string) => {
    rememberScroll('/');
    navigate(`/project/${id}`);
  };

  const resetAll = () => {
    setCtx('all');
    setCategory('all');
    onClearTech();
  };

  const filtered = ctx !== 'all' || category !== 'all' || Boolean(skill);

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          index="SEC 05"
          title="프로젝트"
          meta={`${visible.length} / ${projects.length} ENTRIES`}
          lead="연구실에서 시작해 실무와 개인 작업까지 이어진 기록입니다. 카드를 누르면 문제와 해결 과정, 실측 결과까지 볼 수 있습니다."
        />

        {/* 필터 */}
        <div className="proj-controls">
          <div className="proj-ctx" role="group" aria-label="어디서 한 작업인지">
            <button
              type="button"
              className={`proj-ctx-btn ${ctx === 'all' ? 'is-on' : ''}`}
              onClick={() => setCtx('all')}
            >
              전체 <span className="proj-ctx-n">{projects.length}</span>
            </button>
            {CONTEXT_FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`proj-ctx-btn ${ctx === f.key ? 'is-on' : ''}`}
                style={{ ['--ctx' as string]: f.color }}
                onClick={() => setCtx(ctx === f.key ? 'all' : f.key)}
              >
                <span className="proj-ctx-dot" aria-hidden="true" />
                {f.label} <span className="proj-ctx-n">{countFor(f.has)}</span>
              </button>
            ))}
          </div>

          <div className="proj-row">
            <div className="proj-filters" role="group" aria-label="분야">
              <button
                type="button"
                className={`proj-filter ${category === 'all' ? 'is-on' : ''}`}
                onClick={() => setCategory('all')}
              >
                ALL
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`proj-filter ${category === c ? 'is-on' : ''}`}
                  onClick={() => setCategory(category === c ? 'all' : c)}
                >
                  {CATEGORY_CODE[c]}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="proj-sort"
              onClick={() => setSortBy((s) => (s === 'newest' ? 'oldest' : 'newest'))}
            >
              {sortBy === 'newest' ? '최신순 ↓' : '오래된순 ↑'}
            </button>
          </div>

          {(skill || filtered) && (
            <div className="proj-active">
              {skill && (
                <button type="button" className="proj-chip" onClick={onClearTech}>
                  기술 · <b>{skill.name}</b> <span aria-hidden="true">×</span>
                  <span className="sr-only">필터 지우기</span>
                </button>
              )}
              <span className="proj-active-count readout-sm">
                {visible.length}개 표시 중
              </span>
              <button type="button" className="proj-reset" onClick={resetAll}>
                필터 모두 지우기
              </button>
            </div>
          )}
        </div>

        {visible.length > 0 ? (
          <div className="proj-grid">
            {visible.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={openProject}
                highlight={skill?.match}
              />
            ))}
          </div>
        ) : (
          <div className="proj-empty panel">
            <p>조건에 맞는 프로젝트가 없습니다.</p>
            <button type="button" className="btn btn-ghost" onClick={resetAll}>
              필터 지우기
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
