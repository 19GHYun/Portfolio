import React from 'react';
import { stats } from '../utils/projectStats';
import { SKILL_COUNT } from '../data/skills';
import { orderedProjects } from '../data/explorer';
import { CONTEXT_LABEL } from '../types/Project';
import FileIcon from './ide/FileIcon';
import { isMac, useIde } from './ide/IdeContext';
import { IconGithub, IconMail, IconSearch } from './ide/icons';
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
    <span className="syn-var">now</span>
    <span className="syn-punct">: </span>
    <span className="syn-string">'연구원 · 방산 / 전자전 분야'</span>
    <span className="syn-punct">,</span>
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

// 소개 문장(측정하고 · 붙이고 · 쓰이게)을 실제 프로젝트로 뒷받침한다
const PRINCIPLES = [
  {
    verb: '측정하고',
    title: '신호를 직접 분석합니다',
    body: 'RF로 받은 신호에서 OFDM 부반송파 · QAM 차수 · 펄스 내 변조를 자동으로 분류하고, 펄스 폭 같은 값은 신호발생기로 실측해 오차까지 확인합니다.',
    proof: [
      { id: '12', label: 'RF 분석 도구 3종' },
      { id: '2', label: '저비용 위성 기지국' },
    ],
  },
  {
    verb: '붙이고',
    title: '문서 없는 장비도 연결합니다',
    body: '설명서가 없는 파일 포맷과 장비 SDK는 헤더와 DLL을 분석해 규명하고, ESP32 · BLE · USB 시리얼 · Wi-Fi로 센서와 앱을 잇습니다.',
    proof: [
      { id: '12', label: 'RF 분석 도구 3종' },
      { id: '11', label: '전술 앱 플러그인' },
      { id: '5', label: 'NFC 생체 센서 앱' },
    ],
  },
  {
    verb: '쓰이게',
    title: '현장에서 돌아가야 끝입니다',
    body: '분석 도구는 단일 실행 파일로 묶어 배포하고, 실장비 연동과 기종이 다른 단말 사이 동기화까지 확인한 것만 완료로 칩니다.',
    proof: [
      { id: '12', label: 'RF 분석 도구 3종' },
      { id: '11', label: '전술 앱 플러그인' },
    ],
  },
];

const pinned = orderedProjects.filter((p) => p.featured);

const AboutSection: React.FC = () => {
  const { goToSection, openPalette, openProject } = useIde();
  const mod = isMac() ? '⌘' : 'Ctrl';

  return (
    <section id="about" className="welcome">
      <div className="container">
        <div className="welcome-grid">
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

            <div className="welcome-contact">
              <a href="https://github.com/19GHYun" target="_blank" rel="noopener noreferrer">
                <IconGithub size={15} />
                github.com/19GHYun
              </a>
              <a href="mailto:zxcvting1@gmail.com">
                <IconMail size={15} />
                zxcvting1@gmail.com
              </a>
            </div>

            <h2 className="welcome-h">고정된 프로젝트</h2>
            <ul className="welcome-pinned">
              {pinned.map((p) => (
                <li key={p.id}>
                  <button type="button" onClick={() => openProject(p.id)}>
                    <FileIcon kind="md" />
                    <span className="pin-title">{p.title}</span>
                    <span className="pin-summary">{p.summary}</span>
                    <span className="pin-meta mono">
                      {CONTEXT_LABEL[p.context]} · {dotted(p.startDate)} —{' '}
                      {p.endDate ? dotted(p.endDate) : '현재'}
                      {p.metrics?.[0] && (
                        <span className="pin-metric">
                          {p.metrics[0].label} {p.metrics[0].value}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
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

        <div className="principles">
          <h2 className="principles-title">
            <span className="md-mark" aria-hidden="true">
              ##
            </span>
            이렇게 일합니다
          </h2>
          <div className="principles-grid">
            {PRINCIPLES.map((item, i) => (
              <article key={item.verb} className="card principle reveal">
                <p className="principle-no mono">
                  {String(i + 1).padStart(2, '0')} · {item.verb}
                </p>
                <h3 className="principle-title">{item.title}</h3>
                <p className="principle-body">{item.body}</p>
                <div className="principle-proof">
                  <span className="principle-proof-label mono">근거</span>
                  {item.proof.map((ref) => (
                    <button key={ref.id} type="button" onClick={() => openProject(ref.id)}>
                      <FileIcon kind="md" />
                      {ref.label}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
