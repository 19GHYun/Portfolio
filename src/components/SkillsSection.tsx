import React from 'react';
import './Section.css';

interface Skill {
  name: string;
  level: number; // 1-100
}

interface SkillsSectionProps {}

const SkillsSection: React.FC<SkillsSectionProps> = () => {
  // 샘플 스킬 데이터 - 나중에 실제 데이터로 교체
  const skills: Skill[] = [
    { name: 'JavaScript', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'React', level: 90 },
    { name: 'Node.js', level: 75 },
    { name: 'CSS', level: 80 },
    { name: 'HTML', level: 95 }
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">스킬</h2>
        <div className="section-content">
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress"
                    style={{ width: `${skill.level}%` }}
                  ></div>
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