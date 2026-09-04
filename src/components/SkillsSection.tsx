import React, { useMemo } from 'react';
import { countProjectsUsing } from '../utils/projectStats';
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
    code: 'RF/EMB',
    skills: [
      'ESP32',
      'Arduino',
      'Raspberry Pi',
      'RTL-SDR',
      'NFC',
      'BLE',
      'USB Serial',
      'FlatBuffers',
    ],
  },
  {
    title: '프론트엔드',
    code: 'FRONT',
    skills: ['React', 'Vue.js', 'React Native', 'Unity', 'Three.js', 'PySide6'],
  },
  {
    title: '백엔드 · 인프라',
    code: 'BACK',
    skills: [
      'Spring Boot',
      'FastAPI',
      'Node.js',
      'Docker',
      'Nginx',
      'Jenkins',
      'AWS',
      'WebSocket',
    ],
  },
  {
    title: 'AI · 데이터',
    code: 'AI',
    skills: [
      'TensorFlow',
      'YOLOv8n',
      'PyTorch',
      'NumPy',
      'SciPy',
      'Redis',
      'PostgreSQL',
      'Elastic Search',
    ],
  },
];

const SkillsSection: React.FC<SkillsSectionProps> = () => {
  // 각 스킬이 실제 프로젝트 몇 건에서 쓰였는지 데이터에서 센다.
  // '사용 빈도' 패널이므로 한 번도 안 쓰인 항목은 아예 빼서 빈 줄이 남지 않게 한다.
  const categories = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        ...cat,
        skills: cat.skills
          .map((name) => ({ name, count: countProjectsUsing(name) }))
          .filter((s) => s.count > 0)
          .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
      })).filter((cat) => cat.skills.length > 0),
    []
  );

  const max = useMemo(
    () =>
      Math.max(
        1,
        ...categories.flatMap((c) => c.skills.map((s) => s.count))
      ),
    [categories]
  );

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader
          index="SEC 03"
          title="스킬"
          meta="USAGE BY PROJECT"
          lead="자기평가 퍼센트 대신, 실제로 몇 개의 프로젝트에서 썼는지를 아래 프로젝트 데이터에서 직접 세어 표시합니다."
        />

        <div className="skills-grid">
          {categories.map((cat) => (
            <div key={cat.code} className="skill-panel panel reveal">
              <div className="skill-panel-bar">
                <span className="mono-label">{cat.code}</span>
                <h3 className="skill-panel-title">{cat.title}</h3>
              </div>

              <ul className="skill-list">
                {cat.skills.map((skill) => (
                  <li key={skill.name} className="skill-row">
                    <span className="skill-name">{skill.name}</span>

                    <span className="skill-meter" aria-hidden="true">
                      {Array.from({ length: max }, (_, i) => (
                        <span
                          key={i}
                          className={`skill-tick ${
                            i < skill.count ? 'on' : ''
                          }`}
                        />
                      ))}
                    </span>

                    <span className="skill-count readout">{skill.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="skills-note mono-label">
          숫자 = 해당 기술을 사용한 프로젝트 수
        </p>
      </div>
    </section>
  );
};

export default SkillsSection;
