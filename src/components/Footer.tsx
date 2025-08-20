import React from 'react';
import './Footer.css';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; 2024 Portfolio. All rights reserved.</p>
          <div className="footer-links">
            <a href="mailto:your.email@example.com">Email</a>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;