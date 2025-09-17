import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import './Section.css';
import './ProjectsSection.css';

interface ProjectsSectionProps {}

const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc'>('date-desc');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'in-progress' | 'planned'>('all');

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
      case 'hardware': return '하드웨어';
      default: return category;
    }
  };

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    // 상태별 필터링
    if (filterStatus !== 'all') {
      filtered = filtered.filter(project => project.status === filterStatus);
    }

    // 날짜순 정렬
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.startDate + '-01').getTime();
      const dateB = new Date(b.startDate + '-01').getTime();

      return sortBy === 'date-desc' ? dateB - dateA : dateA - dateB;
    });

    return sorted;
  }, [filterStatus, sortBy]);

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">프로젝트</h2>

        {/* 정렬 및 필터링 컨트롤 */}
        <div className="projects-controls">
          <div className="sort-controls">
            <label htmlFor="sort-select">정렬:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date-desc' | 'date-asc')}
              className="sort-select"
            >
              <option value="date-desc">최신순</option>
              <option value="date-asc">오래된순</option>
            </select>
          </div>

          <div className="filter-controls">
            <label htmlFor="status-filter">상태:</label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'completed' | 'in-progress' | 'planned')}
              className="status-filter"
            >
              <option value="all">전체</option>
              <option value="completed">완료</option>
              <option value="in-progress">진행중</option>
              <option value="planned">계획중</option>
            </select>
          </div>
        </div>

        <div className="section-content">
          <div className="projects-grid">
            {filteredAndSortedProjects.map((project) => (
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