import React from 'react';
import './Footer.css';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; 2025 19YGH_Portfolio. All rights reserved.</p>
          <div className="footer-links">
            <a href="mailto:zxcvting1@gmail.com">Email</a>
            <a href="https://github.com/19GHYun" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://solved.ac/profile/zxcvting1" target="_blank" rel="noopener noreferrer">Solved</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;