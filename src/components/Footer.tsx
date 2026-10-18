import React from 'react';
import { BASIC, LINKS } from '../data/profile';
import { stats } from '../utils/projectStats';
import CopyEmail from './CopyEmail';
import './Footer.css';

interface FooterProps {
  /** 메인 페이지에서만 연락 섹션을 크게 보여 준다 */
  withContact?: boolean;
}

const Footer: React.FC<FooterProps> = ({ withContact }) => (
  <footer id={withContact ? 'contact' : undefined} className="footer">
    <div className="container">
      {withContact && (
        <div className="contact">
          <div className="contact-rule">
            <span className="section-index">SEC 06</span>
            <span className="mono-label">TX · REPLY</span>
          </div>
          <h2 className="contact-title">
            신호가 닿았다면, <em>답신</em> 주세요.
          </h2>
          <p className="contact-lead">
            프로젝트나 함께할 일에 대한 이야기라면 무엇이든 환영합니다. 메일이 가장 빠릅니다.
          </p>

          <div className="contact-mail">
            <a href={`mailto:${BASIC.email}`} className="contact-address">
              {BASIC.email}
            </a>
            <CopyEmail className="btn btn-primary" label="주소 복사" />
          </div>
        </div>
      )}

      <div className="footer-links">
        <a href={`mailto:${BASIC.email}`}>EMAIL</a>
        {LINKS.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label.toUpperCase()} ↗
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
        <span className="mono-label">© {stats.lastYear} YUN GYOUNGHO</span>
      </div>
    </div>
  </footer>
);

export default Footer;
