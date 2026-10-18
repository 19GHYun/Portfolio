import React from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { BASIC } from '../data/profile';
import { SKILL_COUNT } from '../data/skills';
import { CONTEXT_LABEL } from '../types/Project';
import { stats } from '../utils/projectStats';
import { byNewest, contextColorVar } from '../utils/projectMeta';
import { rememberScroll } from '../utils/scrollMemory';
import CopyEmail from './CopyEmail';
import SpectrumScope from './SpectrumScope';
import './AboutSection.css';

interface AboutSectionProps {}

// 스코프 아래 요약 지표.
// SKILLS 는 아래 스킬 섹션에 실제로 보이는 항목 수와 같은 값이다.
const readouts = [
  { key: 'PROJECTS', value: String(stats.total) },
  { key: 'ACTIVE', value: String(stats.active) },
  { key: 'SINCE', value: String(stats.firstYear) },
  { key: 'SKILLS', value: String(SKILL_COUNT) },
];

// 회사 작업을 먼저, 그 안에서는 최신 것부터
const now = projects
  .filter((p) => p.status === 'in-progress')
  .sort((a, b) => Number(b.context === 'company') - Number(a.context === 'company') || byNewest(a, b))
  .slice(0, 4);

// 스코프의 신호 이름표가 가리키는 프로젝트 (OFDM · QAM · 펄스 분석 도구)
const rfProject = projects.find((p) => p.id === '12');

const AboutSection: React.FC<AboutSectionProps> = () => {
  const navigate = useNavigate();

  const openProject = (id: string) => {
    rememberScroll('/');
    navigate(`/project/${id}`);
  };

  const goFeatured = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-main">
            <div className="hero-tag">
              <span className="led active" aria-hidden="true" />
              재직 중 · {BASIC.role}
            </div>

            <h1 className="hero-name">
              {BASIC.name}
              <span className="hero-name-latin">{BASIC.latin.toUpperCase()}</span>
            </h1>

            <p className="hero-role">
              신호를 <em>측정하고</em>, 장비를 <em>붙이고</em>,
              <br />
              현장에서 <em>쓰이게</em> 만듭니다.
            </p>

            <p className="hero-desc">
              RF 신호 분석 도구와 전술 상황인식 앱 플러그인을 만듭니다. 문서가
              없는 장비와 포맷을 실험으로 규명해 붙이고, 고친 것은 숫자로
              확인한 뒤에야 반영합니다.
            </p>

            <div className="hero-actions">
              <a href="#featured" className="btn btn-primary" onClick={goFeatured}>
                대표 작업 보기 ↓
              </a>
              <a
                href="https://github.com/19GHYun"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                GitHub ↗
              </a>
              <CopyEmail className="btn btn-ghost" />
            </div>

            {/* 지금 하고 있는 일 */}
            <div className="hero-now">
              <span className="hero-now-label">
                <span className="mono-label">NOW</span> 지금 하고 있는 일
              </span>
              <ul>
                {now.map((p) => (
                  <li key={p.id}>
                    <button type="button" onClick={() => openProject(p.id)}>
                      <span
                        className="hero-now-dot"
                        style={{ background: contextColorVar(p.context) }}
                        aria-hidden="true"
                      />
                      <span className="hero-now-ctx">{CONTEXT_LABEL[p.context]}</span>
                      <span className="hero-now-title">{p.title.split(' - ')[0]}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 화면의 OFDM · QAM · LFM 은 RF 분석 도구가 실제로 분류하는 신호들이라 그 프로젝트로 잇는다 */}
          <SpectrumScope
            readouts={readouts}
            onTag={rfProject ? () => openProject(rfProject.id) : undefined}
            tagTitle={rfProject ? `이 신호들을 자동 분류하는 도구 → ${rfProject.title.split(' 개발')[0]}` : undefined}
          />
        </div>
      </div>

      <div className="hero-scroll mono-label" aria-hidden="true">
        SCROLL ↓
      </div>
    </section>
  );
};

export default AboutSection;
