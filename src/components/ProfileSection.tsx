import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import CertificateModal from './CertificateModal';
import './Section.css';
import './ProfileSection.css';

interface ProfileSectionProps {}

interface ModalState {
  isOpen: boolean;
  title: string;
  pdfPath: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = () => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    title: '',
    pdfPath: '',
  });

  const open = (title: string, pdfPath: string) =>
    setModal({ isOpen: true, title, pdfPath });

  const close = () => setModal({ isOpen: false, title: '', pdfPath: '' });

  return (
    <section id="profile" className="section">
      <div className="container">
        <SectionHeader index="SEC 02" title="프로필" meta="IDENTITY" />

        <div className="profile-grid">
          {/* 기본 정보 */}
          <div className="profile-panel panel reveal">
            <div className="profile-panel-bar">
              <span className="mono-label">BASIC</span>
              <h3 className="profile-panel-title">기본 정보</h3>
            </div>
            <div className="profile-panel-body">
              <div className="readout-row">
                <span className="readout-key">이름</span>
                <span className="readout-value">윤경호 · Yun GyoungHo</span>
              </div>
              <div className="readout-row">
                <span className="readout-key">이메일</span>
                <span className="readout-value">
                  <a href="mailto:zxcvting1@gmail.com">zxcvting1@gmail.com</a>
                </span>
              </div>
              <div className="readout-row">
                <span className="readout-key">전공</span>
                <span className="readout-value">조선대학교 컴퓨터공학과</span>
              </div>
              <div className="readout-row">
                <span className="readout-key">졸업</span>
                <span className="readout-value num">2024</span>
              </div>
              <div className="readout-row">
                <span className="readout-key">GPA</span>
                <span className="readout-value num">3.52</span>
              </div>
            </div>
          </div>

          {/* 교육 및 훈련 */}
          <div className="profile-panel panel reveal">
            <div className="profile-panel-bar">
              <span className="mono-label">TRAINING</span>
              <h3 className="profile-panel-title">교육 &amp; 훈련</h3>
            </div>
            <div className="profile-panel-body">
              <div className="readout-row">
                <span className="readout-key">2023—2024</span>
                <span className="readout-value">
                  <button
                    type="button"
                    className="cert-link"
                    onClick={() =>
                      open(
                        '학부연구생 참여연구원확인서',
                        '/images/etc/참여연구원확인서_윤경호.pdf'
                      )
                    }
                  >
                    학부연구생
                  </button>
                  <span className="profile-sub">Intelligent Networking Lab</span>
                </span>
              </div>
              <div className="readout-row">
                <span className="readout-key">2024</span>
                <span className="readout-value">
                  <button
                    type="button"
                    className="cert-link"
                    onClick={() =>
                      open(
                        'LG Aimers 4기 수료증',
                        '/images/etc/경호_LG AI 수료증.pdf'
                      )
                    }
                  >
                    LG Aimers 4기
                  </button>
                  <span className="profile-sub">LG</span>
                </span>
              </div>
              <div className="readout-row">
                <span className="readout-key">2025</span>
                <span className="readout-value">
                  SSAFY 13기
                  <span className="profile-sub">Samsung · MultiCampus</span>
                </span>
              </div>
              <div className="readout-row">
                <span className="readout-key">2025-06</span>
                <span className="readout-value">
                  SQLD
                  <span className="profile-sub">Kdata</span>
                </span>
              </div>
            </div>
          </div>

          {/* 논문 */}
          <div className="profile-panel panel reveal profile-panel-wide">
            <div className="profile-panel-bar">
              <span className="mono-label">PUBLICATIONS</span>
              <h3 className="profile-panel-title">논문 &amp; 연구</h3>
            </div>
            <div className="profile-panel-body">
              <div className="paper">
                <span className="paper-venue readout">IPIU 2024</span>
                <p className="paper-title">
                  XR 기반 실시간 의학 실습 교육 플랫폼에서의 프로세스 지연
                  최적화를 위한 서버 네트워크 설계 및 구현
                </p>
              </div>
              <div className="paper">
                <span className="paper-venue readout">KICS 2024</span>
                <p className="paper-title">
                  클라우드 서비스 기반 저비용 위성 기지국 설계 및 데이터 수신
                  시스템 개발
                </p>
              </div>
              <div className="paper">
                <span className="paper-venue readout">2025-08</span>
                <p className="paper-title">
                  신한 해커톤 with SSAFY · 본선 진출
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CertificateModal
        isOpen={modal.isOpen}
        onClose={close}
        title={modal.title}
        pdfPath={modal.pdfPath}
      />
    </section>
  );
};

export default ProfileSection;
