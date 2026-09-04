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
              {/* 프로필 사진 비공개 처리 (83db034). 다시 넣으려면 public/images/profile.jpg 를
                  복구하고 이 span 을 <img src="/images/profile.jpg" alt="Profile" /> 로 되돌린다 */}
              <span className="profile-initials" aria-label="윤경호">
                YGH
              </span>
              <div className="profile-ring"></div>
            </div>
          </div>
          <div className="hero-text">
            <h1 className="hero-title">안녕하세요.</h1>
            <h2 className="hero-subtitle">윤경호의 포트폴리오 사이트 입니다.</h2>
            <p className="hero-description">
              잘 부탁 드립니다.
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