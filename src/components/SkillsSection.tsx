import React, { useMemo } from 'react';
import SectionHeader from './SectionHeader';
import { projects } from '../data/projects';
import { SKILL_CATEGORIES, SKILL_COUNT, projectsUsing } from '../data/skills';
import './Section.css';
import './SkillsSection.css';

interface SkillsSectionProps {
  /** 스킬을 누르면 그 기술을 쓴 프로젝트만 목록에 남긴다 */
  onPick: (skillName: string) => void;
  active?: string | null;
}

const SEGMENTS = 8;

const SkillsSection: React.FC<SkillsSectionProps> = ({ onPick, active }) => {
  // 스킬마다 그 기술을 쓴 프로젝트 수
  const rows = useMemo(
    () =>
      SKILL_CATEGORIES.map((cat) => ({
        ...cat,
        skills: cat.skills.map((s) => ({ ...s, count: projectsUsing(s).length })),
      })),
    []
  );

  const max = Math.max(1, ...rows.flatMap((c) => c.skills.map((s) => s.count)));

  // 가장 많이 쓴 기술
  const top = rows
    .flatMap((c) => c.skills)
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 6);

  const meter = (count: number) => {
    const lit = count > 0 ? Math.max(1, Math.round((count / max) * SEGMENTS)) : 0;
    return (
      <span className="skill-meter" aria-hidden="true">
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <span key={i} className={i < lit ? 'on' : ''} />
        ))}
      </span>
    );
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader
          index="SEC 03"
          title="스킬"
          meta={`${SKILL_COUNT} SKILLS`}
          lead="막대는 그 기술을 실제로 쓴 프로젝트 수입니다. 누르면 아래 프로젝트 목록이 그 기술을 쓴 것만 남습니다."
        />

        <div className="skills-grid">
          {rows.map((cat) => (
            <div key={cat.code} className="skill-panel panel reveal">
              <div className="skill-panel-bar">
                <span className="mono-label">{cat.code}</span>
                <h3 className="skill-panel-title">{cat.title}</h3>
                <span className="skill-panel-count mono-label">{cat.skills.length}</span>
              </div>

              <ul className="skill-rows">
                {cat.skills.map((s) => (
                  <li key={s.name}>
                    <button
                      type="button"
                      className={`skill-row ${active === s.name ? 'is-active' : ''}`}
                      onClick={() => onPick(s.name)}
                      disabled={s.count === 0}
                      title={
                        s.count > 0
                          ? `${s.name} 을 쓴 프로젝트 ${s.count}개 보기`
                          : `${s.name} - 이 사이트의 프로젝트 목록에는 아직 없음`
                      }
                    >
                      <span className="skill-name">{s.name}</span>
                      {meter(s.count)}
                      <span className="skill-count readout">{s.count > 0 ? s.count : '—'}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 가장 많이 쓴 기술 */}
          <div className="skill-panel skill-panel-top panel reveal">
            <div className="skill-panel-bar">
              <span className="mono-label">PEAK</span>
              <h3 className="skill-panel-title">가장 많이 쓴 기술</h3>
            </div>
            <ol className="skill-top">
              {top.map((s, i) => (
                <li key={s.name}>
                  <button type="button" onClick={() => onPick(s.name)}>
                    <span className="skill-top-rank mono-label">{String(i + 1).padStart(2, '0')}</span>
                    <span className="skill-top-name">{s.name}</span>
                    <span className="skill-top-bar" aria-hidden="true">
                      <span style={{ width: `${(s.count / max) * 100}%` }} />
                    </span>
                    <span className="skill-top-count readout">{s.count}</span>
                  </button>
                </li>
              ))}
            </ol>
            <p className="skill-top-note">이 사이트에 정리한 프로젝트 {projects.length}개 기준 (회사 작업 포함)</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
