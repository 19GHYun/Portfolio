import React from 'react';
import './Section.css';
import './ProfileSection.css';

interface ProfileSectionProps {}

const ProfileSection: React.FC<ProfileSectionProps> = () => {
  return (
    <section id="profile" className="section">
      <div className="container">
        <h2 className="section-title">프로필</h2>
        <div className="section-content">
          <div className="profile-grid">
            <div className="profile-column">
              <h3 className="profile-category">기본 정보</h3>
              <div className="profile-item">
                <h4>이름</h4>
                <p>{process.env.REACT_APP_USER_NAME || '[이름을 입력하세요]'}</p>
                <p>{process.env.REACT_APP_USER_NAME_EN || '[영문명을 입력하세요]'}</p>
                <p>{process.env.REACT_APP_USER_NAME_CN || '[한자명을 입력하세요]'}</p>
              </div>
              <div className="profile-item">
                <h4>이메일</h4>
                <p>{process.env.REACT_APP_USER_EMAIL || '[이메일을 입력하세요]'}</p>
              </div>
              <div className="profile-item">
                <h4>전화번호</h4>
                <p>{process.env.REACT_APP_USER_PHONE || '[전화번호를 입력하세요]'}</p>
              </div>
              <div className="profile-item">
                <h4>주소</h4>
                <p>{process.env.REACT_APP_USER_ADDRESS || '[주소를 입력하세요]'}</p>
              </div>
            </div>

            <div className="profile-column">
              <h3 className="profile-category">학력</h3>
              <div className="profile-item">
                <h4>최종 학력</h4>
                <p>{process.env.REACT_APP_UNIVERSITY || '[대학교명]'} - {process.env.REACT_APP_MAJOR || '[전공명]'}</p>
                <span className="profile-date">{process.env.REACT_APP_GRADUATION_YEAR || '[졸업년도]'}</span>
              </div>
              <div className="profile-item">
                <h4>GPA</h4>
                <p>{process.env.REACT_APP_GPA || '[학점을 입력하세요]'}</p>
              </div>
            </div>

            <div className="profile-column">
              <h3 className="profile-category">교육 & 훈련</h3>
              <div className="profile-item">
                <h4>주요 교육과정</h4>
                <ul className="profile-list">
                  <li>[Intelligent Networking Lab] - [학부연구생] ([2023-2024])</li>
                  <li>[LG Aimers 4기] - [LG] ([2024])</li>
                  <li>[SSAFY 13기] - [Samsung, MultCampus] ([2025])</li>
                </ul>
              </div>
            </div>

            <div className="profile-column">
              <h3 className="profile-category">외국어</h3>
              <div className="profile-item">
                <h4>언어 능력</h4>
                <div className="language-skills">
                  <div className="language-item">
                    <span className="language-name">영어</span>
                    <span className="language-level">[X]</span>
                  </div>
                  <div className="language-item">
                    <span className="language-name">일본어</span>
                    <span className="language-level">[X]</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-column">
              <h3 className="profile-category">자격증</h3>
              <div className="profile-item">
                <h4>취득 자격증</h4>
                <ul className="profile-list">
                  <li>[SQLD] - [Kdata] ([2025-06-27])</li>
                </ul>
              </div>
            </div>

            <div className="profile-column">
              <h3 className="profile-category">논문 & 연구</h3>
              <div className="profile-item">
                <h4>발표 논문</h4>
                <ul className="profile-list">
                  <li>"[XR 기반 실시간 의학 실습 교육 플랫폼에서의 프로세스 지연 최적화를 위한 서버 네트워크 설계 및 구현]" - [IPIU2024] ([2024])</li>
                  <li>"[클라우드 서비스 기반 저비용 위성 기지국 설계 및 데이터 수신 시스템 개발]" - [2024KICS] ([2024])</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;