import React from 'react';
import './Section.css';

interface ProfileSectionProps {}

const ProfileSection: React.FC<ProfileSectionProps> = () => {
  return (
    <section id="profile" className="section">
      <div className="container">
        <h2 className="section-title">프로필</h2>
        <div className="section-content">
          <div className="profile-info">
            <div className="profile-item">
              <h3>이름</h3>
              <p>[이름을 입력하세요]</p>
            </div>
            <div className="profile-item">
              <h3>이메일</h3>
              <p>[이메일을 입력하세요]</p>
            </div>
            <div className="profile-item">
              <h3>전화번호</h3>
              <p>[전화번호를 입력하세요]</p>
            </div>
            <div className="profile-item">
              <h3>주소</h3>
              <p>[주소를 입력하세요]</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;