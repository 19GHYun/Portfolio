import React from 'react';
import { CONTEXT_LABEL, Project } from '../types/Project';
import {
  CATEGORY_CODE,
  STATUS_LABEL,
  contextColorVar,
  periodText,
  teamText,
  thumbOf,
} from '../utils/projectMeta';
import ProjectCover from './ProjectCover';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  onOpen: (id: string) => void;
  /** 이 표현식에 맞는 기술 태그를 강조한다 (스킬 필터) */
  highlight?: RegExp;
  /** 작게 (상세 페이지 아래 이전 / 다음) */
  compact?: boolean;
  /** 카드 위에 붙는 작은 글씨 (예: '← 이전') */
  kicker?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpen,
  highlight,
  compact,
  kicker,
}) => {
  const thumb = thumbOf(project);
  const isActive = project.status === 'in-progress';

  // 강조할 기술은 앞으로 당겨서 4개 안에 보이게 한다
  const tech = highlight
    ? [
        ...project.technologies.filter((t) => highlight.test(t)),
        ...project.technologies.filter((t) => !highlight.test(t)),
      ]
    : project.technologies;
  const shown = tech.slice(0, compact ? 3 : 4);

  return (
    <article
      className={`pcard panel reveal ${compact ? 'is-compact' : ''} ${
        project.featured ? 'is-featured' : ''
      }`}
      style={{ ['--ctx' as string]: contextColorVar(project.context) }}
      onClick={() => onOpen(project.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(project.id);
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={`${project.title} 자세히 보기`}
    >
      <div className="pcard-visual">
        {thumb ? (
          <img src={thumb} alt="" loading="lazy" />
        ) : (
          <ProjectCover project={project} height={compact ? 120 : 170} />
        )}
        <span className="pcard-ctx">{CONTEXT_LABEL[project.context]}</span>
        {project.featured && <span className="pcard-star">★ 대표</span>}
        <span className={`pcard-status ${project.status}`}>
          <span className={`led ${isActive ? 'active' : 'done'}`} aria-hidden="true" />
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      <div className="pcard-body">
        <div className="pcard-kicker readout-sm">
          {kicker ? <b>{kicker}</b> : null}
          <span>{CATEGORY_CODE[project.category]}</span>
          <span>{periodText(project)}</span>
          <span>{teamText(project)}</span>
        </div>

        <h3 className="pcard-title">{project.title}</h3>
        {!compact && <p className="pcard-summary">{project.summary}</p>}

        {!compact && project.metrics && project.metrics.length > 0 && (
          <dl className="pcard-metrics">
            {project.metrics.slice(0, 3).map((m) => (
              <div key={m.label}>
                <dt className="k-label">{m.label}</dt>
                <dd className="readout">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="pcard-tech">
          {shown.map((t) => (
            <span key={t} className={`tech-tag ${highlight && highlight.test(t) ? 'is-hit' : ''}`}>
              {t}
            </span>
          ))}
          {tech.length > shown.length && (
            <span className="tech-more">+{tech.length - shown.length}</span>
          )}
        </div>
      </div>

      <span className="pcard-go mono-label" aria-hidden="true">
        자세히 →
      </span>
    </article>
  );
};

export default ProjectCard;
