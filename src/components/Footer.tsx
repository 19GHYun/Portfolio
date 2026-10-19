import React from 'react';
import { stats } from '../utils/projectStats';
import './Footer.css';

const LINKS = [
  { key: 'email', label: 'zxcvting1@gmail.com', href: 'mailto:zxcvting1@gmail.com' },
  { key: 'github', label: 'github.com/19GHYun', href: 'https://github.com/19GHYun' },
  { key: 'solved.ac', label: 'solved.ac/profile/zxcvting1', href: 'https://solved.ac/profile/zxcvting1' },
];

/** 맨 아래 터미널 패널: 연락처를 명령 결과처럼 보여 준다 */
const Footer: React.FC = () => (
  <footer className="terminal" aria-label="연락처">
    <div className="container">
      <div className="term-panel">
        <div className="term-tabs mono" aria-hidden="true">
          <span>문제</span>
          <span>출력</span>
          <span>디버그 콘솔</span>
          <span className="is-on">터미널</span>
          <span className="term-shell">pwsh</span>
        </div>

        <div className="term-body mono">
          <p>
            <span className="term-prompt">PS C:\ygh&gt;</span> contact --all
          </p>
          <dl className="term-list">
            {LINKS.map((link) => (
              <div key={link.key}>
                <dt>{link.key}</dt>
                <dd>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
          <p className="term-ok">
            ✓ {stats.total} projects · {stats.firstYear}—{stats.lastYear}
          </p>
          <p>
            <span className="term-prompt">PS C:\ygh&gt;</span>{' '}
            <span className="term-cursor" aria-hidden="true" />
          </p>
        </div>
      </div>

      <p className="term-copy mono">© 2026 YUN GYOUNGHO · built with React</p>
    </div>
  </footer>
);

export default Footer;
