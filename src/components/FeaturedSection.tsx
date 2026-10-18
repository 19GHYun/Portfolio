import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTEXT_LABEL, Project } from '../types/Project';
import {
  CATEGORY_CODE,
  STATUS_LABEL,
  contextColorVar,
  featuredProjects,
  imagesOf,
  periodText,
} from '../utils/projectMeta';
import { rememberScroll } from '../utils/scrollMemory';
import ProjectCover from './ProjectCover';
import SectionHeader from './SectionHeader';
import './Section.css';
import './FeaturedSection.css';

const SLIDE_MS = 4200;

/** 대표 작업의 그림. 여러 장이면 천천히 넘어가고, 마우스를 올리면 멈춘다 */
const CaseVisual: React.FC<{ project: Project; index: number; onOpen: () => void }> = ({
  project,
  index,
  onOpen,
}) => {
  const images = imagesOf(project);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length < 2 || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(
      () => setSlide((s) => (s + 1) % images.length),
      SLIDE_MS
    );
    return () => window.clearInterval(timer);
  }, [images.length, paused]);

  return (
    <div
      className="case-visual panel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="case-visual-bar">
        <span className="mono-label">CASE {String(index + 1).padStart(2, '0')}</span>
        {images.length > 0 && (
          <span className="mono-label">
            FIG {slide + 1} / {images.length}
          </span>
        )}
      </div>

      <button type="button" className="case-visual-frame" onClick={onOpen} aria-label={`${project.title} 자세히 보기`}>
        {images.length > 0 ? (
          images.map((img, i) => (
            <React.Fragment key={img.src}>
              {/* 비율이 안 맞아 남는 칸을 같은 그림을 흐리게 깔아 채운다 */}
              <img src={img.src} alt="" aria-hidden="true" className={`case-fill ${i === slide ? 'is-on' : ''}`} loading="lazy" />
              <img
                src={img.src}
                alt={img.description || project.title}
                className={`case-img ${i === slide ? 'is-on' : ''}`}
                loading="lazy"
              />
            </React.Fragment>
          ))
        ) : (
          <ProjectCover project={project} height={260} />
        )}
      </button>

      {images.length > 0 && (
        <div className="case-visual-foot">
          <span className="case-caption">{images[slide]?.description}</span>
          {images.length > 1 && (
            <span className="case-dots">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  className={i === slide ? 'is-on' : ''}
                  onClick={() => setSlide(i)}
                  aria-label={`${i + 1}번째 그림`}
                />
              ))}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const FeaturedSection: React.FC = () => {
  const navigate = useNavigate();
  const featured = featuredProjects();

  const open = (id: string) => {
    rememberScroll('/');
    navigate(`/project/${id}`);
  };

  return (
    <section id="featured" className="section featured-section">
      <div className="container">
        <SectionHeader
          index="SEC 01"
          title="대표 작업"
          meta={`${featured.length} CASES`}
          lead="문제와 결과가 가장 분명했던 세 가지입니다. 회사 작업은 제품명과 세부 사양을 빼고 적었습니다."
        />

        <div className="case-list">
          {featured.map((p, i) => {
            const hi = 0;
            return (
              <article
                key={p.id}
                className={`case reveal ${i % 2 === 1 ? 'is-flip' : ''}`}
                style={{ ['--ctx' as string]: contextColorVar(p.context) }}
              >
                <CaseVisual project={p} index={i} onOpen={() => open(p.id)} />

                <div className="case-body">
                  <div className="case-meta">
                    <span className="case-ctx">{CONTEXT_LABEL[p.context]}</span>
                    <span className="mono-label">{CATEGORY_CODE[p.category]}</span>
                    <span className={`case-status ${p.status}`}>
                      <span
                        className={`led ${p.status === 'in-progress' ? 'active' : 'done'}`}
                        aria-hidden="true"
                      />
                      {STATUS_LABEL[p.status]}
                    </span>
                    <span className="case-period readout-sm">{periodText(p)}</span>
                  </div>

                  <h3 className="case-title">
                    <button type="button" onClick={() => open(p.id)}>
                      {p.title}
                    </button>
                  </h3>
                  <p className="case-summary">{p.summary}</p>

                  {p.metrics && p.metrics.length > 0 && (
                    <dl className="case-metrics">
                      {p.metrics.slice(0, 3).map((m) => (
                        <div key={m.label}>
                          <dt className="k-label">{m.label}</dt>
                          <dd className="readout">{m.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {p.challenges[hi] && p.solutions[hi] && (
                    <div className="case-pair">
                      <div>
                        <span className="case-pair-tag is-problem">PROBLEM</span>
                        <p>{p.challenges[hi]}</p>
                      </div>
                      <div>
                        <span className="case-pair-tag is-fix">FIX</span>
                        <p>{p.solutions[hi]}</p>
                      </div>
                    </div>
                  )}

                  <div className="case-foot">
                    <div className="case-tech">
                      {p.technologies.slice(0, 5).map((t) => (
                        <span key={t} className="tech-tag">
                          {t}
                        </span>
                      ))}
                      {p.technologies.length > 5 && (
                        <span className="tech-more">+{p.technologies.length - 5}</span>
                      )}
                    </div>
                    <button type="button" className="btn btn-ghost case-go" onClick={() => open(p.id)}>
                      케이스 스터디 →
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
