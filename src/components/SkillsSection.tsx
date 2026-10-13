import React from 'react';
import SectionHeader from './SectionHeader';
import { SKILL_CATEGORIES as CATEGORIES } from '../data/skills';
import './Section.css';
import './SkillsSection.css';

interface SkillsSectionProps {}

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
