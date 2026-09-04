import React from 'react';
import { stats } from '../utils/projectStats';
import './Footer.css';

interface FooterProps {}

const LINKS = [
  { label: 'EMAIL', href: 'mailto:zxcvting1@gmail.com' },
  { label: 'GITHUB', href: 'https://github.com/19GHYun' },
  { label: 'SOLVED.AC', href: 'https://solved.ac/profile/zxcvting1' },
];

const Footer: React.FC<FooterProps> = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-links">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* 계측기 하단 상태 표시줄 */}
      <div className="footer-status">
        <span className="mono-label">
          <span className="led active" aria-hidden="true" />
          {stats.total} PROJECTS
        </span>
        <span className="mono-label">
          {stats.firstYear}—{stats.lastYear}
        </span>
        <span className="mono-label">© 2026 YOON GYEONGHO</span>
      </div>
    </div>
  </footer>
);

export default Footer;
