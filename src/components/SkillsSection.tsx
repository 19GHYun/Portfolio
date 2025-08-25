import React from 'react';
import './Section.css';
import './SkillsSection.css';

interface Skill {
  name: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface SkillsSectionProps {}

const SkillsSection: React.FC<SkillsSectionProps> = () => {
  const programmingLanguages: Skill[] = [
    { name: 'Python' },
    { name: 'Java' },
    { name: 'JavaScript/TypeScript' },
    { name: 'C#' },
    { name: 'C++' },
    { name: 'JASS' }
  ];

  const frontendSkills: Skill[] = [
    { name: 'React' },
    { name: 'Vue.js' },
    { name: 'TypeScript' },
    { name: 'CSS/Tailwind CSS' },
    { name: 'Three.js' },
    { name: 'React Router' }
  ];

  const backendSkills: Skill[] = [
    { name: 'Spring Boot' },
    { name: 'Node.js' },
    { name: 'gRPC' },
    { name: 'JPA/QueryDSL' },
    { name: 'Spring Security' },
    { name: 'WebSocket/STOMP' }
  ];

  const aiMlSkills: Skill[] = [
    { name: 'TensorFlow' },
    { name: 'Computer Vision' },
    { name: 'Audio Processing' },
    { name: 'Model Optimization' },
    { name: 'Image Processing' }
  ];

  const databaseCloudSkills: Skill[] = [
    { name: 'MySQL' },
    { name: 'PostgreSQL' },
    { name: 'Redis' },
    { name: 'AWS' },
    { name: 'Cloudflare R2' }
  ];

  const hardwareIotSkills: Skill[] = [
    { name: 'Arduino' },
    { name: 'Raspberry Pi' },
    { name: 'RTL-SDR' },
    { name: 'NFC/RFID' },
    { name: 'RF Communication' }
  ];

  const skillCategories: SkillCategory[] = [
    { title: 'Programming Languages', skills: programmingLanguages },
    { title: 'Frontend Development', skills: frontendSkills },
    { title: 'Backend Development', skills: backendSkills },
    { title: 'AI/Machine Learning', skills: aiMlSkills },
    { title: 'Database & Cloud', skills: databaseCloudSkills },
    { title: 'Hardware & IoT', skills: hardwareIotSkills }
  ];

  const renderSkillItem = (skill: Skill) => (
    <div key={skill.name} className="skill-item">
      <span className="skill-name">{skill.name}</span>
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
                  {category.skills.map(renderSkillItem)}
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