import React from 'react';
import { stats } from '../utils/projectStats';
import { SKILL_COUNT } from '../data/skills';
import { projectFile, recentProjects } from '../data/explorer';
import FileIcon from './ide/FileIcon';
import { isMac, useIde } from './ide/IdeContext';
import { IconBranch, IconExtensions, IconAccount, IconGithub, IconMail, IconSearch } from './ide/icons';
import './AboutSection.css';

// 'YYYY-MM' -> 'YYYY.MM'
const dotted = (value: string) => value.replace('-', '.');

// about.ts 코드 카드. 토큰마다 문법 강조 색을 입힌다
const CODE: React.ReactNode[] = [
  <span className="syn-comment">{'/**'}</span>,
  <span className="syn-comment">{' * @author 윤경호 (Yun GyoungHo)'}</span>,
  <span className="syn-comment">{' * @role 신호 분석 · 임베디드 개발자'}</span>,
  <span className="syn-comment">{' */'}</span>,
  <>
    <span className="syn-keyword">export const</span> <span className="syn-const">developer</span>{' '}
    <span className="syn-punct">=</span> <span className="syn-punct">{'{'}</span>
  </>,
  <>
    {'  '}
    <span className="syn-var">focus</span>
    <span className="syn-punct">: [</span>
    <span className="syn-string">'RF 신호 분석'</span>
    <span className="syn-punct">, </span>
    <span className="syn-string">'임베디드 통신'</span>
    <span className="syn-punct">, </span>
    <span className="syn-string">'전술 앱'</span>
    <span className="syn-punct">],</span>
  </>,
  <>
    {'  '}
    <span className="syn-var">projects</span>
    <span className="syn-punct">: </span>
    <span className="syn-number">{stats.total}</span>
    <span className="syn-punct">, </span>
    <span className="syn-var">active</span>
    <span className="syn-punct">: </span>
    <span className="syn-number">{stats.active}</span>
    <span className="syn-punct">,</span>
  </>,
  <>
    {'  '}
    <span className="syn-var">since</span>
    <span className="syn-punct">: </span>
    <span className="syn-number">{stats.firstYear}</span>
    <span className="syn-punct">,</span>
  </>,
  <>
    {'  '}
    <span className="syn-var">rule</span>
    <span className="syn-punct">: </span>
    <span className="syn-string">'고친 건 숫자로 확인한 뒤에 반영'</span>
    <span className="syn-punct">,</span>
  </>,
  <>
    <span className="syn-punct">{'}'}</span> <span className="syn-keyword">as const</span>
    <span className="syn-punct">;</span>
  </>,
  <>
    <span className="code-cursor" aria-hidden="true" />
  </>,
];

const AboutSection: React.FC = () => {
  const { goToSection, openPalette, openProject } = useIde();
  const mod = isMac() ? '⌘' : 'Ctrl';

  const shortcuts = [
    { label: '타임라인 보기', icon: <IconBranch size={16} />, run: () => goToSection('workmap') },
    { label: '다뤄 본 기술', icon: <IconExtensions size={16} />, run: () => goToSection('skills') },
    { label: '경력 · 학력', icon: <IconAccount size={16} />, run: () => goToSection('profile') },
  ];

  return (
    <section id="about" className="welcome">
      <div className="container welcome-grid">
        <div className="welcome-main">
          <p className="welcome-kicker">
            <span className="welcome-dot" aria-hidden="true" />
            RF 신호 분석 도구 개발 중
          </p>

          <h1 className="welcome-name">
            <span className="md-mark" aria-hidden="true">
              #
            </span>
            윤경호
          </h1>
          <p className="welcome-role">신호 분석 · 임베디드 개발자</p>

          <p className="welcome-lead">
            신호를 <em>측정하고</em>, 장비를 <em>붙이고</em>, 현장에서 <em>쓰이게</em>{' '}
            만듭니다. 문서가 없는 장비와 포맷은 실험으로 규명해서 붙이고, 고친 것은
            숫자로 확인한 뒤에야 반영합니다.
          </p>

          <div className="welcome-actions">
            <button type="button" className="btn btn-primary" onClick={() => goToSection('projects')}>
              프로젝트 열기
            </button>
            <button type="button" className="btn" onClick={openPalette}>
              <IconSearch size={14} />
              빠른 검색
              <span className="welcome-keys" aria-hidden="true">
                <kbd>{mod}</kbd>
                <kbd>K</kbd>
              </span>
            </button>
          </div>

          <div className="welcome-cols">
            <div>
              <h2 className="welcome-h">바로 가기</h2>
              <ul className="welcome-links">
                {shortcuts.map((s) => (
                  <li key={s.label}>
                    <button type="button" onClick={s.run}>
                      {s.icon}
                      {s.label}
                    </button>
                  </li>
                ))}
                <li>
                  <a href="https://github.com/19GHYun" target="_blank" rel="noopener noreferrer">
                    <IconGithub size={16} />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="mailto:zxcvting1@gmail.com">
                    <IconMail size={16} />
                    메일 보내기
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="welcome-h">최근 연 파일</h2>
              <ul className="welcome-recent">
                {recentProjects.slice(0, 5).map((p) => (
                  <li key={p.id}>
                    <button type="button" onClick={() => openProject(p.id)} title={p.title}>
                      <FileIcon kind="md" />
                      <span className="recent-title">{p.title}</span>
                      <span className="recent-path mono">
                        projects/{projectFile(p)} · {dotted(p.startDate)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="welcome-side" aria-label="요약">
          <div className="code-window">
            <div className="cw-bar mono">
              <span className="cw-tab">
                <FileIcon kind="ts" />
                about.ts
              </span>
            </div>
            <pre className="cw-code mono">
              <code>
                {CODE.map((line, i) => (
                  <span key={i} className="cl" style={{ ['--i' as string]: i }}>
                    {line}
                  </span>
                ))}
              </code>
            </pre>
          </div>

          <dl className="welcome-stats">
            <div>
              <dt className="mono">projects</dt>
              <dd>{stats.total}</dd>
            </div>
            <div>
              <dt className="mono">active</dt>
              <dd>{stats.active}</dd>
            </div>
            <div>
              <dt className="mono">skills</dt>
              <dd>{SKILL_COUNT}</dd>
            </div>
            <div>
              <dt className="mono">since</dt>
              <dd>{stats.firstYear}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
};

export default AboutSection;
