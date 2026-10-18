import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { CONTEXT_LABEL } from '../types/Project';
import {
  CATEGORY_CODE,
  CATEGORY_LABEL,
  STATUS_LABEL,
  contextColorVar,
  imagesOf,
  neighborsOf,
  periodText,
  teamText,
} from '../utils/projectMeta';
import { recallScroll, rememberScroll } from '../utils/scrollMemory';
import useReveal from '../hooks/useReveal';
import Footer from './Footer';
import ImageLightbox from './ImageLightbox';
import ProjectCard from './ProjectCard';
import ProjectCover from './ProjectCover';
import './Section.css';
import './ProjectDetail.css';

// '[OFDM] 부반송파 분류' 처럼 앞에 붙은 묶음 이름으로 기능을 나눈다
const groupFeatures = (features: string[]) => {
  const groups: { tag: string | null; items: string[] }[] = [];
  features.forEach((f) => {
    const m = f.match(/^\[([^\]]+)\]\s*(.*)$/);
    const tag = m ? m[1] : null;
    const text = m ? m[2] : f;
    const last = groups[groups.length - 1];
    if (last && last.tag === tag) last.items.push(text);
    else groups.push({ tag, items: [text] });
  });
  return groups;
};

const getYouTubeEmbedUrl = (url: string) => {
  const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('overview');
  useReveal();

  const project = projects.find((p) => p.id === id);
  const images = useMemo(() => (project ? imagesOf(project) : []), [project]);

  // 목차: 지금 읽고 있는 칸
  useEffect(() => {
    if (!project) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const probe = window.innerHeight * 0.3;
      let current = 'overview';
      document.querySelectorAll<HTMLElement>('.pd-section[id]').forEach((el) => {
        if (el.getBoundingClientRect().top <= probe) current = el.id;
      });
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [project]);

  const handleBackToProjects = () => {
    // 목록에서 카드를 눌러 들어왔다면 보던 그 자리로 돌아간다
    if (recallScroll('/') !== undefined) {
      navigate('/', { replace: true, state: { restoreScroll: true } });
      return;
    }

    // 상세 주소로 바로 들어온 경우엔 기억한 위치가 없으니 프로젝트 섹션으로
    navigate('/', { replace: true });
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (!project) {
    return (
      <div className="pd">
        <div className="container pd-missing">
          <span className="mono-label">404 · NO SIGNAL</span>
          <h1>프로젝트를 찾을 수 없습니다</h1>
          <button onClick={handleBackToProjects} className="btn btn-ghost">
            ← 프로젝트 목록으로
          </button>
        </div>
      </div>
    );
  }

  const banner = images[0];
  const gallery = images.slice(1);
  const featureGroups = groupFeatures(project.features);
  const paired =
    project.challenges.length > 0 && project.challenges.length === project.solutions.length;
  const { prev, next } = neighborsOf(project.id);

  const openNeighbor = (pid: string) => {
    // 이웃 프로젝트로 넘어가도 '목록으로'는 원래 보던 목록 위치로 돌아가야 하므로 기억을 덮어쓰지 않는다
    if (recallScroll('/') === undefined) rememberScroll('/');
    navigate(`/project/${pid}`);
  };

  const toc = [
    { id: 'overview', label: '개요' },
    gallery.length > 0 && { id: 'gallery', label: '이미지' },
    project.features.length > 0 && { id: 'features', label: '주요 기능' },
    project.youtubeUrl && { id: 'video', label: '영상' },
    project.challenges.length > 0 && { id: 'problems', label: '문제와 해결' },
    project.results.length > 0 && { id: 'results', label: '결과' },
    project.reflection && { id: 'reflection', label: '회고' },
  ].filter(Boolean) as { id: string; label: string }[];

  const links = [
    project.gameUrl && { href: project.gameUrl, label: '게임 페이지 · 다운로드', icon: '🎮', primary: true },
    project.demoUrl && { href: project.demoUrl, label: '데모 보기', icon: '🚀', primary: true },
    project.githubUrl && { href: project.githubUrl, label: 'GitHub', icon: '📁' },
    project.documentation && { href: project.documentation, label: '문서', icon: '📚' },
    project.namuWikiUrl && { href: project.namuWikiUrl, label: '나무위키', icon: '🌱' },
  ].filter(Boolean) as { href: string; label: string; icon: string; primary?: boolean }[];

  // 제목 앞 번호는 실제로 보이는 칸 순서대로
  const num = (sectionId: string) => String(toc.findIndex((t) => t.id === sectionId) + 1).padStart(2, '0');

  const jump = (sectionId: string) =>
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <div className="pd" style={{ ['--ctx' as string]: contextColorVar(project.context) }}>
        <div className="container">
          {/* 머리 */}
          <div className="pd-crumbs">
            <button onClick={handleBackToProjects} className="back-button">
              ← 프로젝트 목록
            </button>
            <span className="mono-label">
              PROJECT {project.id.padStart(2, '0')} / {CATEGORY_CODE[project.category]} /{' '}
              {CONTEXT_LABEL[project.context]}
            </span>
          </div>

          <header className="pd-head">
            <div className="pd-kicker">
              <span className="pd-ctx">{CONTEXT_LABEL[project.context]}</span>
              {project.featured && <span className="pd-star">★ 대표 작업</span>}
              <span className={`pd-status ${project.status}`}>
                <span
                  className={`led ${project.status === 'in-progress' ? 'active' : 'done'}`}
                  aria-hidden="true"
                />
                {STATUS_LABEL[project.status]}
              </span>
              <span className="readout-sm">{periodText(project)}</span>
              <span className="readout-sm">{teamText(project)}</span>
            </div>
            <h1 className="pd-title">{project.title}</h1>
            <p className="pd-lead">{project.summary}</p>
          </header>

          {/* 대표 그림 */}
          {banner ? (
            <button
              type="button"
              className="pd-banner panel"
              onClick={() => setLightboxIndex(0)}
              aria-label={`${banner.description || project.title} 크게 보기`}
            >
              <img src={banner.src} alt="" aria-hidden="true" className="pd-banner-fill" />
              <img src={banner.src} alt={banner.description || project.title} className="pd-banner-img" />
              {banner.description && <span className="pd-banner-cap">{banner.description}</span>}
            </button>
          ) : (
            <div className="pd-banner is-cover panel">
              <ProjectCover project={project} height={180} />
            </div>
          )}

          {/* 대표 수치 */}
          {project.metrics && project.metrics.length > 0 && (
            <dl className="pd-metrics">
              {project.metrics.map((m, i) => (
                <div key={m.label} className="pd-metric">
                  <dt className="k-label">
                    <span className="mono-label">M{i + 1}</span> {m.label}
                  </dt>
                  <dd className="readout">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="pd-layout">
            <article className="pd-main">
              <section id="overview" className="pd-section">
                <h2 className="pd-h">
                  <span>{num('overview')}</span> 개요
                </h2>
                <p className="pd-text">{project.description}</p>
              </section>

              {gallery.length > 0 && (
                <section id="gallery" className="pd-section">
                  <h2 className="pd-h">
                    <span>{num('gallery')}</span> 이미지 <em>{images.length}</em>
                  </h2>
                  <div className={`pd-gallery ${gallery.length === 1 ? 'is-single' : ''}`}>
                    {gallery.map((image, i) => (
                      <figure key={image.src} className="pd-figure">
                        <button
                          type="button"
                          onClick={() => setLightboxIndex(i + 1)}
                          aria-label={`${image.description || `${project.title} 이미지 ${i + 2}`} 크게 보기`}
                        >
                          <img
                            src={image.src}
                            alt={image.description || `${project.title} 이미지 ${i + 2}`}
                            loading="lazy"
                          />
                        </button>
                        {image.description && (
                          <figcaption>
                            <span className="mono-label">FIG {i + 2}</span> {image.description}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </section>
              )}

              {project.features.length > 0 && (
                <section id="features" className="pd-section">
                  <h2 className="pd-h">
                    <span>{num('features')}</span> 주요 기능
                  </h2>
                  {featureGroups.map((g, gi) => (
                    <div key={`${g.tag}-${gi}`} className="pd-feature-group">
                      {g.tag && <h3 className="pd-feature-tag">{g.tag}</h3>}
                      <ul className="pd-features">
                        {g.items.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              )}

              {project.youtubeUrl && (
                <section id="video" className="pd-section">
                  <h2 className="pd-h">
                    <span>▶</span> 데모 영상
                  </h2>
                  <div className="youtube-container">
                    <iframe
                      src={getYouTubeEmbedUrl(project.youtubeUrl) || ''}
                      title="프로젝트 데모 영상"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </section>
              )}

              {project.challenges.length > 0 && (
                <section id="problems" className="pd-section">
                  <h2 className="pd-h">
                    <span>{num('problems')}</span> 문제와 해결
                  </h2>
                  {paired ? (
                    <ol className="pd-pairs">
                      {project.challenges.map((c, i) => (
                        <li key={i} className="pd-pair">
                          <div className="pd-pair-num readout">{String(i + 1).padStart(2, '0')}</div>
                          <div className="pd-pair-body">
                            <div className="pd-problem">
                              <span className="pd-tag is-problem">PROBLEM</span>
                              <p>{c}</p>
                            </div>
                            <div className="pd-fix">
                              <span className="pd-tag is-fix">FIX</span>
                              <p>{project.solutions[i]}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <div className="pd-split">
                      <div>
                        <span className="pd-tag is-problem">PROBLEM</span>
                        <ul className="pd-features">
                          {project.challenges.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="pd-tag is-fix">FIX</span>
                        <ul className="pd-features">
                          {project.solutions.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </section>
              )}

              {project.results.length > 0 && (
                <section id="results" className="pd-section">
                  <h2 className="pd-h">
                    <span>{num('results')}</span> 결과
                  </h2>
                  <ul className="pd-results">
                    {project.results.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </section>
              )}

              {project.reflection && (
                <section id="reflection" className="pd-section">
                  <h2 className="pd-h">
                    <span>{num('reflection')}</span> 회고
                  </h2>
                  <blockquote className="pd-reflection">{project.reflection}</blockquote>
                </section>
              )}
            </article>

            {/* 옆 패널 */}
            <aside className="pd-side">
              <div className="pd-panel panel">
                <div className="pd-panel-bar mono-label">SPEC</div>
                <dl className="pd-spec">
                  <div className="readout-row">
                    <dt className="readout-key">기간</dt>
                    <dd className="readout-value num">{periodText(project)}</dd>
                  </div>
                  <div className="readout-row">
                    <dt className="readout-key">팀</dt>
                    <dd className="readout-value">{project.teamSize}명</dd>
                  </div>
                  <div className="readout-row">
                    <dt className="readout-key">맥락</dt>
                    <dd className="readout-value">{CONTEXT_LABEL[project.context]}</dd>
                  </div>
                  <div className="readout-row">
                    <dt className="readout-key">분야</dt>
                    <dd className="readout-value">{CATEGORY_LABEL[project.category]}</dd>
                  </div>
                  <div className="pd-role">
                    <dt className="readout-key">담당</dt>
                    <dd>{project.myRole}</dd>
                  </div>
                </dl>
              </div>

              <div className="pd-panel panel">
                <div className="pd-panel-bar mono-label">
                  STACK <span>{project.technologies.length}</span>
                </div>
                <div className="pd-stack">
                  {project.technologies.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {links.length > 0 && (
                <div className="pd-links">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn ${l.primary ? 'btn-primary' : 'btn-ghost'}`}
                    >
                      <span aria-hidden="true">{l.icon}</span> {l.label} ↗
                    </a>
                  ))}
                </div>
              )}

              <nav className="pd-toc" aria-label="목차">
                <span className="mono-label">CONTENTS</span>
                {toc.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={activeSection === t.id ? 'is-on' : ''}
                    onClick={() => jump(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </nav>
            </aside>
          </div>

          {/* 이전 / 다음 */}
          {(prev || next) && (
            <nav className="pd-neighbors" aria-label="다른 프로젝트">
              {prev ? (
                <ProjectCard project={prev} onOpen={openNeighbor} compact kicker="← 최근 작업" />
              ) : (
                <span />
              )}
              {next ? (
                <ProjectCard project={next} onOpen={openNeighbor} compact kicker="지난 작업 →" />
              ) : (
                <span />
              )}
            </nav>
          )}

          <div className="pd-bottom">
            <button onClick={handleBackToProjects} className="btn btn-ghost">
              ← 프로젝트 목록으로 돌아가기
            </button>
          </div>
        </div>

        {lightboxIndex !== null && (
          <ImageLightbox
            images={images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProjectDetail;
