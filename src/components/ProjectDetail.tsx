import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import './ProjectDetail.css';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.id === id);

  const handleBackToProjects = () => {
    navigate('/', { replace: true });
    // 약간의 지연 후 프로젝트 섹션으로 스크롤
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (!project) {
    return (
      <div className="project-detail-container">
        <div className="container">
          <h1>프로젝트를 찾을 수 없습니다</h1>
          <button onClick={handleBackToProjects} className="back-button">
            프로젝트 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '완료';
      case 'in-progress': return '진행중';
      case 'planned': return '계획중';
      default: return status;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'web': return '웹 개발';
      case 'mobile': return '모바일 앱';
      case 'desktop': return '데스크톱 앱';
      case 'ai': return '인공지능';
      case 'research': return '연구';
      case 'etc': return '기타';
      default: return category;
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };

  return (
    <div className="project-detail-container">
      <div className="container">
        {/* 헤더 섹션 */}
        <div className="project-header">
          <button onClick={handleBackToProjects} className="back-button">
            ← 프로젝트 목록으로
          </button>
          <div className="project-title-section">
            <h1 className="project-title">{project.title}</h1>
            <div className="project-meta">
              <span className={`status-badge ${project.status}`}>
                {getStatusText(project.status)}
              </span>
              <span className="category-badge">
                {getCategoryText(project.category)}
              </span>
              <span className="period-badge">
                {project.startDate} ~ {project.endDate || '현재'}
              </span>
            </div>
          </div>
        </div>

        {/* 프로젝트 개요 */}
        <div className="project-overview">
          <div className="overview-grid">
            <div className="overview-item">
              <h3>프로젝트 개요</h3>
              <p>{project.description}</p>
            </div>
            <div className="overview-item">
              <h3>팀 규모</h3>
              <p>{project.teamSize}명</p>
            </div>
            <div className="overview-item">
              <h3>담당 역할</h3>
              <p>{project.myRole}</p>
            </div>
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="project-section">
          <h2>사용 기술</h2>
          <div className="tech-stack">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-badge">{tech}</span>
            ))}
          </div>
        </div>

        {/* 프로젝트 이미지 */}
        {project.images && project.images.length > 0 && (
          <div className="project-section">
            <h2>프로젝트 이미지</h2>
            <div className="project-images">
              {project.images.map((image, index) => (
                <div key={index} className="image-container">
                  <img
                    src={image}
                    alt={project.imageDescriptions?.[index] || `${project.title} 이미지 ${index + 1}`}
                    className="project-image"
                  />
                  {project.imageDescriptions?.[index] && (
                    <p className="image-description">{project.imageDescriptions[index]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 주요 기능 */}
        <div className="project-section">
          <h2>주요 기능</h2>
          <ul className="feature-list">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* 유튜브 영상 */}
        {project.youtubeUrl && (
          <div className="project-section">
            <h2>프로젝트 데모 영상</h2>
            <div className="youtube-container">
              <iframe
                src={getYouTubeEmbedUrl(project.youtubeUrl) || ''}
                title="프로젝트 데모 영상"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* 도전 과제와 해결책 */}
        <div className="project-section">
          <h2>도전 과제 및 해결책</h2>
          <div className="challenge-solution-grid">
            <div className="challenges">
              <h3>도전 과제</h3>
              <ul>
                {project.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
            <div className="solutions">
              <h3>해결책</h3>
              <ul>
                {project.solutions.map((solution, index) => (
                  <li key={index}>{solution}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 결과 및 성과 */}
        <div className="project-section">
          <h2>결과 및 성과</h2>
          <ul className="results-list">
            {project.results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>

        {/* 프로젝트 회고 */}
        {project.reflection && (
          <div className="project-section">
            <h2>프로젝트 회고</h2>
            <div className="reflection-content">
              <p>{project.reflection}</p>
            </div>
          </div>
        )}

        {/* 링크들 */}
        <div className="project-links">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="link-button demo">
              🚀 데모 보기
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="link-button github">
              📁 GitHub 보기
            </a>
          )}
          {project.documentation && (
            <a href={project.documentation} target="_blank" rel="noopener noreferrer" className="link-button docs">
              📚 문서 보기
            </a>
          )}
          {project.namuWikiUrl && (
            <a href={project.namuWikiUrl} target="_blank" rel="noopener noreferrer" className="link-button namuwiki">
              🌱 나무위키 보기
            </a>
          )}
        </div>

        {/* 하단 뒤로가기 버튼 */}
        <div className="bottom-navigation">
          <button onClick={handleBackToProjects} className="back-button-bottom">
            ← 프로젝트 목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;