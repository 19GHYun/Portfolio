import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { orderedProjects } from '../data/explorer';
import { CONTEXT_LABEL } from '../types/Project';
import { getProjectImages } from '../utils/projectImages';
import ImageLightbox from './ImageLightbox';
import ProjectCover from './ProjectCover';
import FileIcon from './ide/FileIcon';
import { useIde } from './ide/IdeContext';
import { IconCheck, IconGithub, IconLink, IconRun } from './ide/icons';
import './ProjectDetail.css';

const STATUS_TEXT: Record<string, string> = {
  completed: '완료',
  'in-progress': '진행 중',
  planned: '계획',
};

const CATEGORY_TEXT: Record<string, string> = {
  web: '웹 개발',
  mobile: '모바일 앱',
  desktop: '데스크톱 앱',
  ai: '인공지능',
  research: '연구',
  etc: '기타',
  hardware: '하드웨어',
  game: '게임',
};

const getYouTubeEmbedUrl = (url: string) => {
  const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
};

const vars = (v: Record<string, string>) => v as React.CSSProperties;

const H2: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h2 className="md-h2">
    <span className="md-mark" aria-hidden="true">
      ##
    </span>
    {children}
  </h2>
);

/** 프로젝트 상세: 프로젝트 문서(.md)의 미리 보기처럼 보여 준다 */
const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { backToList, openProject } = useIde();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const project = projects.find((p) => p.id === id);

  // projects.ts에 직접 적은 이미지 + src/assets/projects/<id>/ 에서 자동 수집한 이미지
  const galleryImages = useMemo(() => {
    if (!project) return [];

    const declared = (project.images || []).map((src, index) => ({
      src,
      description: project.imageDescriptions?.[index] || '',
    }));

    return [...declared, ...getProjectImages(project.id)];
  }, [project]);

  if (!project) {
    return (
      <article className="md-preview">
        <div className="container md-container md-missing">
          <p className="mono md-missing-code">404</p>
          <h1 className="md-title">파일을 찾을 수 없습니다</h1>
          <p className="md-lead">주소가 바뀌었거나 없는 프로젝트입니다.</p>
          <button type="button" onClick={backToList} className="btn btn-primary">
            프로젝트 목록으로
          </button>
        </div>
      </article>
    );
  }

  // 탐색기 순서 기준 이전 · 다음 파일
  const index = orderedProjects.findIndex((p) => p.id === project.id);
  const prev = index > 0 ? orderedProjects[index - 1] : null;
  const next = index < orderedProjects.length - 1 ? orderedProjects[index + 1] : null;

  // coverBanner 인 프로젝트는 첫 이미지를 제목 아래 큰 배너로 띄우고 목록에서는 뺀다.
  // 배너를 누르면 라이트박스에서 나머지 이미지와 함께 넘겨 볼 수 있다.
  const banner = project.coverBanner ? galleryImages[0] : undefined;
  const listedImages = galleryImages
    .map((image, i) => ({ image, i }))
    .filter(({ i }) => !(banner && i === 0));

  const links = [
    project.gameUrl
      ? { href: project.gameUrl, label: '게임 페이지 · 다운로드', icon: <IconRun size={15} />, primary: true }
      : null,
    project.githubUrl && project.githubUrl !== '#'
      ? { href: project.githubUrl, label: 'GitHub 저장소', icon: <IconGithub size={15} /> }
      : null,
    project.demoUrl ? { href: project.demoUrl, label: '데모 보기', icon: <IconRun size={15} /> } : null,
    project.documentation
      ? { href: project.documentation, label: '문서 보기', icon: <IconLink size={15} /> }
      : null,
    project.namuWikiUrl
      ? { href: project.namuWikiUrl, label: '나무위키', icon: <IconLink size={15} /> }
      : null,
  ].filter(
    (l): l is { href: string; label: string; icon: React.ReactElement; primary?: boolean } =>
      Boolean(l)
  );

  return (
    <article className="md-preview">
      <div className="read-progress" aria-hidden="true" />

      <div className="container md-container">
        <button type="button" onClick={backToList} className="md-back mono">
          ← projects/
        </button>

        {/* 머리말(front matter): 프로젝트 기본 정보 */}
        <dl className="front-matter mono" aria-label="프로젝트 정보">
          <div className="fm-fence" aria-hidden="true">
            ---
          </div>
          <div>
            <dt>category</dt>
            <dd className="fm-str">{CATEGORY_TEXT[project.category] ?? project.category}</dd>
          </div>
          <div>
            <dt>context</dt>
            <dd className="fm-str">{CONTEXT_LABEL[project.context]}</dd>
          </div>
          <div>
            <dt>status</dt>
            <dd className={`fm-status ${project.status}`}>{STATUS_TEXT[project.status]}</dd>
          </div>
          <div>
            <dt>period</dt>
            <dd className="fm-num">
              {project.startDate} ~ {project.endDate || '현재'}
            </dd>
          </div>
          <div>
            <dt>team</dt>
            <dd className="fm-num">
              {project.teamSize === 1 ? '단독 개발' : `${project.teamSize}인`}
            </dd>
          </div>
          <div>
            <dt>role</dt>
            <dd className="fm-str">{project.myRole.trim()}</dd>
          </div>
          <div className="fm-fence" aria-hidden="true">
            ---
          </div>
        </dl>

        <h1 className="md-title" style={vars({ '--vt': `proj-title-${project.id}` })}>
          {project.title}
        </h1>
        <p className="md-lead">{project.summary}</p>

        {/* 대표 수치 */}
        {project.metrics && project.metrics.length > 0 && (
          <dl className="md-metrics">
            {project.metrics.map((m) => (
              <div key={m.label} className="md-metric">
                <dd className="mono">{m.value}</dd>
                <dt>{m.label}</dt>
              </div>
            ))}
          </dl>
        )}

        {banner && (
          <button
            type="button"
            className="md-banner"
            onClick={() => setLightboxIndex(0)}
            aria-label={`${banner.description || project.title} 크게 보기`}
          >
            <img src={banner.src} alt={banner.description || project.title} />
          </button>
        )}

        {/* 이미지가 없는 프로젝트는 생성된 파형으로 머리그림을 대신한다 */}
        {galleryImages.length === 0 && (
          <div className="md-cover">
            <ProjectCover project={project} height={150} />
          </div>
        )}

        <H2>개요</H2>
        <p className="md-p">{project.description}</p>

        <H2>기술 스택</H2>
        <div className="md-tech">
          {project.technologies.map((tech) => (
            <code key={tech}>{tech}</code>
          ))}
        </div>

        {listedImages.length > 0 && (
          <>
            <H2>이미지</H2>
            <div className="md-gallery">
              {listedImages.map(({ image, i }) => (
                <figure key={`${image.src}-${i}`} className="md-figure">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`${image.description || `${project.title} 이미지 ${i + 1}`} 크게 보기`}
                  >
                    <img
                      src={image.src}
                      alt={image.description || `${project.title} 이미지 ${i + 1}`}
                      loading="lazy"
                    />
                  </button>
                  {image.description && <figcaption>{image.description}</figcaption>}
                </figure>
              ))}
            </div>
          </>
        )}

        {lightboxIndex !== null && (
          <ImageLightbox
            images={galleryImages}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}

        <H2>주요 기능</H2>
        <ul className="md-checklist">
          {project.features.map((feature, i) => (
            <li key={i}>
              <span className="md-box" aria-hidden="true">
                <IconCheck size={11} />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        {project.youtubeUrl && (
          <>
            <H2>데모 영상</H2>
            <div className="md-video">
              <iframe
                src={getYouTubeEmbedUrl(project.youtubeUrl) || ''}
                title="프로젝트 데모 영상"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </>
        )}

        {/* 문제와 해결: 왼쪽은 지운 줄(-), 오른쪽은 더한 줄(+) 인 비교 화면처럼 */}
        <H2>문제와 해결</H2>
        <div className="diff">
          <div className="diff-pane is-del">
            <div className="diff-head mono">
              <span className="diff-sign">−</span> 문제 <span className="diff-count">{project.challenges.length}</span>
            </div>
            {project.challenges.map((text, i) => (
              <div key={i} className="diff-line">
                <span className="diff-ln mono">{i + 1}</span>
                <span className="diff-mark mono" aria-hidden="true">
                  -
                </span>
                <span className="diff-text">{text}</span>
              </div>
            ))}
          </div>
          <div className="diff-pane is-add">
            <div className="diff-head mono">
              <span className="diff-sign">+</span> 해결 <span className="diff-count">{project.solutions.length}</span>
            </div>
            {project.solutions.map((text, i) => (
              <div key={i} className="diff-line">
                <span className="diff-ln mono">{i + 1}</span>
                <span className="diff-mark mono" aria-hidden="true">
                  +
                </span>
                <span className="diff-text">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <H2>결과</H2>
        <ul className="md-results">
          {project.results.map((result, i) => (
            <li key={i}>
              <IconCheck size={15} />
              <span>{result}</span>
            </li>
          ))}
        </ul>

        {project.reflection && (
          <>
            <H2>회고</H2>
            <blockquote className="md-quote">{project.reflection}</blockquote>
          </>
        )}

        {links.length > 0 && (
          <div className="md-links">
            {links.map((l) => (
              <a
                key={l.href}
                className={`btn ${l.primary ? 'btn-primary' : ''}`}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.icon}
                {l.label}
              </a>
            ))}
          </div>
        )}

        {/* 이전 · 다음 파일 */}
        <nav className="md-pager" aria-label="다른 프로젝트">
          {prev ? (
            <button type="button" className="md-page prev" onClick={() => openProject(prev.id)}>
              <span className="md-page-dir mono">← 이전 파일</span>
              <span className="md-page-file">
                <FileIcon kind="md" />
                {prev.title}
              </span>
            </button>
          ) : (
            <span />
          )}
          {next ? (
            <button type="button" className="md-page next" onClick={() => openProject(next.id)}>
              <span className="md-page-dir mono">다음 파일 →</span>
              <span className="md-page-file">
                <FileIcon kind="md" />
                {next.title}
              </span>
            </button>
          ) : (
            <span />
          )}
        </nav>

        <div className="md-bottom">
          <button type="button" onClick={backToList} className="btn">
            ← 프로젝트 목록으로
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProjectDetail;
