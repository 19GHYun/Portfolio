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
  const programmingLanguages: Skill[] = [
    { name: 'Python', level: 85 },
    { name: 'Java', level: 80 },
    { name: 'JavaScript/TypeScript', level: 75 },
    { name: 'C#', level: 70 },
    { name: 'C++', level: 65 },
    { name: 'JASS', level: 60 }
  ];

  const frontendSkills: Skill[] = [
    { name: 'React', level: 80 },
    { name: 'Vue.js', level: 75 },
    { name: 'TypeScript', level: 75 },
    { name: 'CSS/Tailwind CSS', level: 70 },
    { name: 'Three.js', level: 65 },
    { name: 'React Router', level: 70 }
  ];

  const backendSkills: Skill[] = [
    { name: 'Spring Boot', level: 80 },
    { name: 'Node.js', level: 70 },
    { name: 'gRPC', level: 65 },
    { name: 'JPA/QueryDSL', level: 75 },
    { name: 'Spring Security', level: 70 },
    { name: 'WebSocket/STOMP', level: 75 }
  ];

  const aiMlSkills: Skill[] = [
    { name: 'TensorFlow', level: 80 },
    { name: 'Computer Vision', level: 85 },
    { name: 'Audio Processing', level: 70 },
    { name: 'Model Optimization', level: 75 },
    { name: 'Image Processing', level: 80 }
  ];

  const databaseCloudSkills: Skill[] = [
    { name: 'MySQL', level: 75 },
    { name: 'PostgreSQL', level: 70 },
    { name: 'Redis', level: 65 },
    { name: 'AWS', level: 70 },
    { name: 'Cloudflare R2', level: 60 }
  ];

  const hardwareIotSkills: Skill[] = [
    { name: 'Arduino', level: 80 },
    { name: 'Raspberry Pi', level: 85 },
    { name: 'RTL-SDR', level: 75 },
    { name: 'NFC/RFID', level: 70 },
    { name: 'RF Communication', level: 75 }
  ];

  const skillCategories: SkillCategory[] = [
    { title: 'Programming Languages', skills: programmingLanguages },
    { title: 'Frontend Development', skills: frontendSkills },
    { title: 'Backend Development', skills: backendSkills },
    { title: 'AI/Machine Learning', skills: aiMlSkills },
    { title: 'Database & Cloud', skills: databaseCloudSkills },
    { title: 'Hardware & IoT', skills: hardwareIotSkills }
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