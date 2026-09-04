import React from 'react';
import SectionHeader from './SectionHeader';
import './Section.css';
import './SkillsSection.css';

interface SkillsSectionProps {}

const CATEGORIES: { title: string; code: string; skills: string[] }[] = [
  {
    title: '언어',
    code: 'LANG',
    skills: ['Python', 'Java', 'C#', 'TypeScript', 'JavaScript', 'C++', 'JASS'],
  },
  {
    title: '신호 · 임베디드',
    code: 'RF / EMB',
    skills: [
      'ESP32',
      'Arduino',
      'Raspberry Pi',
      'RTL-SDR',
      'RF Communication',
      'NFC / RFID',
      'BLE',
      'USB Serial',
      'FlatBuffers',
    ],
  },
  {
    title: '프론트엔드',
    code: 'FRONT',
    skills: [
      'React',
      'Vue.js',
      'React Native',
      'Unity',
      'Three.js',
      'PySide6',
      'Tailwind CSS',
      'React Router',
    ],
  },
  {
    title: '백엔드 · 인프라',
    code: 'BACK',
    skills: [
      'Spring Boot',
      'FastAPI',
      'Node.js',
      'gRPC',
      'JPA / QueryDSL',
      'Spring Security',
      'WebSocket / STOMP',
      'Docker',
      'Nginx',
      'Jenkins',
      'AWS',
    ],
  },
  {
    title: 'AI · 데이터',
    code: 'AI / DATA',
    skills: [
      'TensorFlow',
      'PyTorch',
      'Computer Vision',
      'YOLOv8n',
      'NumPy / SciPy',
      'MySQL',
      'PostgreSQL',
      'Redis',
      'Elastic Search',
      'Cloudflare R2',
    ],
  },
];

const SkillsSection: React.FC<SkillsSectionProps> = () => (
  <section id="skills" className="section">
    <div className="container">
      <SectionHeader
        index="SEC 03"
        title="스킬"
        meta={`${CATEGORIES.length} GROUPS`}
      />

      <div className="skills-grid">
        {CATEGORIES.map((cat) => (
          <div key={cat.code} className="skill-panel panel reveal">
            <div className="skill-panel-bar">
              <span className="mono-label">{cat.code}</span>
              <h3 className="skill-panel-title">{cat.title}</h3>
            </div>

            <ul className="skill-chips">
              {cat.skills.map((name, i) => (
                <li
                  key={name}
                  className="skill-chip"
                  style={{ ['--i' as string]: i }}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
