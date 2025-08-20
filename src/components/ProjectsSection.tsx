import React from 'react';
import './Section.css';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

interface ProjectsSectionProps {}

const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  // 샘플 프로젝트 데이터 - 나중에 실제 데이터로 교체
  const projects: Project[] = [
    {
      id: 1,
      title: '프로젝트 1',
      description: '프로젝트에 대한 설명이 여기에 들어갑니다.',
      technologies: ['React', 'TypeScript', 'CSS'],
      link: '#',
      github: '#'
    },
    {
      id: 2,
      title: '프로젝트 2',
      description: '두 번째 프로젝트에 대한 설명입니다.',
      technologies: ['JavaScript', 'Node.js', 'Express'],
      link: '#',
      github: '#'
    }
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">프로젝트</h2>
        <div className="section-content">
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.link && (
                    <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                      Demo
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  )}
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