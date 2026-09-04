import React from 'react';
import { stats } from '../utils/projectStats';
import './AboutSection.css';

interface AboutSectionProps {}

// 히어로 하단에 깔리는 계측값
const readouts = [
  { key: 'PROJECTS', value: String(stats.total) },
  { key: 'ACTIVE', value: String(stats.active) },
  { key: 'SPAN', value: `${stats.firstYear}—${stats.lastYear}` },
  { key: 'STACK', value: String(stats.technologies) },
];

const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <section id="about" className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-main">
            <div className="hero-tag mono-label">
              <span className="led active" aria-hidden="true" />
              PORTFOLIO / 2026
            </div>

            <h1 className="hero-name">
              윤경호
              <span className="hero-name-latin">YOON GYEONGHO</span>
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
              <a href="#projects" className="btn btn-primary">
                프로젝트 보기
              </a>
              <a
                href="https://github.com/19GHYun"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* 우측 계측 패널 */}
          <aside className="hero-panel panel" aria-label="요약 지표">
            <div className="hero-panel-bar">
              <span className="mono-label">SUMMARY</span>
              <span className="mono-label">CH.01</span>
            </div>

            <div className="hero-scope" aria-hidden="true">
              <svg viewBox="0 0 320 130" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="hero-trace" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--phosphor)" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="var(--phosphor)" stopOpacity="1" />
                    <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                <g stroke="var(--line)" strokeWidth="1">
                  {[26, 52, 78, 104].map((y) => (
                    <line key={y} x1="0" y1={y} x2="320" y2={y} />
                  ))}
                  {[64, 128, 192, 256].map((x) => (
                    <line key={x} x1={x} y1="0" x2={x} y2="130" />
                  ))}
                </g>
                <path
                  className="hero-trace-path"
                  d="M0,65 L28,65 L28,30 L48,30 L48,65 L96,65 L96,100 L112,100 L112,65 L150,65
                     C160,65 165,34 175,34 C185,34 190,96 200,96 C210,96 214,65 224,65
                     L252,65 L252,40 L268,40 L268,65 L320,65"
                  fill="none"
                  stroke="url(#hero-trace)"
                  strokeWidth="1.8"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            <dl className="hero-readouts">
              {readouts.map((item) => (
                <div key={item.key} className="hero-readout">
                  <dt className="mono-label">{item.key}</dt>
                  <dd className="readout">{item.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>

      <div className="hero-scroll mono-label" aria-hidden="true">
        SCROLL ↓
      </div>
    </section>
  );
};

export default AboutSection;
