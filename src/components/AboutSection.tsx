import React from 'react';
import './Section.css';
import './AboutSection.css';

interface AboutSectionProps {}

const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <section id="about" className="section hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="profile-image-container">
            <div className="profile-image">
              <img 
                src="https://via.placeholder.com/300x300/4ade80/1a1a1a?text=YOUR+PHOTO" 
                alt="Profile" 
              />
              <div className="profile-ring"></div>
            </div>
          </div>
          <div className="hero-text">
            <h1 className="hero-title">안녕하세요! 👋</h1>
            <h2 className="hero-subtitle">환영합니다</h2>
            <p className="hero-description">
              이곳은 저의 포트폴리오 웹사이트입니다.<br/>
              개발에 대한 열정과 창의적인 아이디어로<br/>
              더 나은 웹 경험을 만들어 나가고 있습니다.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="cta-button primary">
                프로젝트 보기
              </a>
              <a href="#profile" className="cta-button secondary">
                더 알아보기
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;