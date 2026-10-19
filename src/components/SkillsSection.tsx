import React from 'react';
import SectionHeader from './SectionHeader';
import { SKILL_CATEGORIES as CATEGORIES, SKILL_COUNT } from '../data/skills';
import './Section.css';
import './SkillsSection.css';

// 분류 코드 -> 코드 속 변수 이름
const VAR_NAME: Record<string, string> = {
  LANG: 'languages',
  'RF / EMB': 'signalEmbedded',
  FRONT: 'frontend',
  BACK: 'backendInfra',
  'AI / DATA': 'aiData',
};

const toVar = (code: string) => VAR_NAME[code] ?? code.toLowerCase().replace(/\W+/g, '');

/** skills.ts: 분류마다 문자열 배열 하나처럼 보여 준다 */
const SkillsSection: React.FC = () => (
  <section id="skills" className="section">
    <div className="container">
      <SectionHeader
        file="skills.ts"
        kind="ts"
        title="다뤄 본 기술"
        meta={`${SKILL_COUNT} items`}
        lead="프로젝트에서 직접 써 본 기술만 적었습니다."
      />

      <div className="skills-grid">
        {CATEGORIES.map((cat) => (
          <article key={cat.code} className="card skill-card reveal">
            <div className="code-head">
              <span className="syn-keyword">export const</span>
              <span className="syn-const">{toVar(cat.code)}</span>
              <span className="syn-punct">= [</span>
              <span className="syn-comment skill-note">
                {`// ${cat.title} · ${cat.skills.length}`}
              </span>
            </div>

            <ul className="skill-tokens">
              {cat.skills.map((name, i) => (
                <li key={name} className="skill-token mono" style={{ ['--i' as string]: i }}>
                  <span className="skill-q" aria-hidden="true">
                    '
                  </span>
                  {name}
                  <span className="skill-q" aria-hidden="true">
                    '
                  </span>
                </li>
              ))}
            </ul>

            <div className="code-tail">];</div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
