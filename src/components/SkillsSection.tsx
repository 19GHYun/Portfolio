import React from 'react';
import './Section.css';
import './SkillsSection.css';

interface Skill {
  name: string;
  level: number; // 1-100
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface SkillsSectionProps {}

const SkillsSection: React.FC<SkillsSectionProps> = () => {
  // 스킬 카테고리별 데이터 - 프로젝트 작성 후 실제 데이터로 교체 예정
  const hardSkills: Skill[] = [
    { name: 'JavaScript', level: 0 },
    { name: 'TypeScript', level: 0 },
    { name: 'Python', level: 0 },
    { name: 'Java', level: 0 },
    { name: 'C/C++', level: 0 },
    { name: 'SQL', level: 0 }
  ];

  const softSkills: Skill[] = [
    { name: '팀워크', level: 0 },
    { name: '의사소통', level: 0 },
    { name: '문제해결', level: 0 },
    { name: '리더십', level: 0 },
    { name: '적응력', level: 0 },
    { name: '창의성', level: 0 }
  ];

  const frameworks: Skill[] = [
    { name: 'React', level: 0 },
    { name: 'Vue.js', level: 0 },
    { name: 'Node.js', level: 0 },
    { name: 'Express', level: 0 },
    { name: 'Spring Boot', level: 0 },
    { name: 'Django', level: 0 }
  ];

  const skillCategories: SkillCategory[] = [
    { title: 'Hard Skills', skills: hardSkills },
    { title: 'Soft Skills', skills: softSkills },
    { title: 'Frameworks', skills: frameworks }
  ];

  const renderSkillBar = (skill: Skill) => (
    <div key={skill.name} className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-percentage">
          {skill.level > 0 ? `${skill.level}%` : '추후 업데이트'}
        </span>
      </div>
      <div className="skill-bar">
        <div 
          className="skill-progress"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">스킬</h2>
        <div className="section-content">
          <div className="skills-categories">
            {skillCategories.map((category, index) => (
              <div key={index} className="skill-category">
                <h3 className="skill-category-title">{category.title}</h3>
                <div className="skills-grid">
                  {category.skills.map(renderSkillBar)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;