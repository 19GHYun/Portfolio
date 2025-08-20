import React from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import './Section.css';
import './ProjectsSection.css';

interface ProjectsSectionProps {}

const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  const navigate = useNavigate();

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

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
      case 'mobile': return '모바일';
      case 'desktop': return '데스크톱';
      case 'ai': return 'AI/ML';
      case 'research': return '연구';
      case 'etc': return '기타';
      default: return category;
    }
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">프로젝트</h2>
        <div className="section-content">
          <div className="projects-grid">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="project-card"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="project-card-header">
                  <div className="project-badges">
                    <span className={`status-badge ${project.status}`}>
                      {getStatusText(project.status)}
                    </span>
                    <span className="category-badge">
                      {getCategoryText(project.category)}
                    </span>
                  </div>
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                
                <div className="project-technologies">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="tech-more">+{project.technologies.length - 3}</span>
                  )}
                </div>
                
                <div className="project-footer">
                  <div className="project-meta">
                    <span className="team-size">👥 {project.teamSize}명</span>
                    <span className="period">{project.startDate} ~ {project.endDate || '현재'}</span>
                  </div>
                  <div className="project-arrow">
                    <span>자세히 보기 →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;