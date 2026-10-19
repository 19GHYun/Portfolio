import React, { useState } from 'react';
import { CAREER } from '../data/career';
import { projects } from '../data/projects';
import SectionHeader from './SectionHeader';
import CertificateModal from './CertificateModal';
import { useIde } from './ide/IdeContext';
import './Section.css';
import './ProfileSection.css';

// 'YYYY-MM' -> 'YYYY.MM'
const dotted = (value: string) => value.replace('-', '.');

interface ModalState {
  isOpen: boolean;
  title: string;
  pdfPath: string;
}

/** JSON 처럼 보이는 카드: 머리에 "key": [ , 꼬리에 ], */
const JsonCard: React.FC<
  React.PropsWithChildren<{ name: string; note: string; open: string; wide?: boolean }>
> = ({ name, note, open, wide, children }) => (
  <article className={`card json-card reveal ${wide ? 'is-wide' : ''}`}>
    <div className="code-head">
      <span className="syn-var">"{name}"</span>
      <span className="syn-punct">: {open}</span>
      <span className="syn-comment">{`// ${note}`}</span>
    </div>
    <div className="json-body">{children}</div>
    <div className="code-tail">{open === '[' ? '],' : '},'}</div>
  </article>
);

const Row: React.FC<React.PropsWithChildren<{ k: string }>> = ({ k, children }) => (
  <div className="json-row">
    <span className="json-key mono">"{k}"</span>
    <span className="json-val">{children}</span>
  </div>
);

const ProfileSection: React.FC = () => {
  const { openProject } = useIde();
  const [modal, setModal] = useState<ModalState>({ isOpen: false, title: '', pdfPath: '' });

  const open = (title: string, pdfPath: string) => setModal({ isOpen: true, title, pdfPath });
  const close = () => setModal({ isOpen: false, title: '', pdfPath: '' });

  return (
    <section id="profile" className="section">
      <div className="container">
        <SectionHeader
          file="profile.json"
          kind="json"
          title="프로필"
          meta="4 keys"
          lead="경력, 기본 정보, 교육, 논문입니다. 회사에서 한 프로젝트는 눌러서 바로 볼 수 있습니다."
        />

        <div className="profile-grid">
          {/* 경력: 회사에서 한 프로젝트는 projects.ts 의 context 로 자동으로 모은다 */}
          <JsonCard name="career" note="경력" open="[" wide>
            {CAREER.map((job) => {
              const work = projects
                .filter((p) => p.context === job.context)
                .sort((a, b) => b.startDate.localeCompare(a.startDate));

              return (
                <div key={job.start} className="career">
                  <div className="career-top">
                    <span className="career-period mono">
                      {dotted(job.start)} — {job.end ? dotted(job.end) : '현재'}
                    </span>
                    {!job.end && (
                      <span className="career-now">
                        <span className="career-now-dot" aria-hidden="true" />
                        재직 중
                      </span>
                    )}
                  </div>
                  <p className="career-role">
                    {job.role}
                    <span className="career-org">{job.org}</span>
                  </p>
                  <ul className="career-work">
                    {work.map((p) => (
                      <li key={p.id}>
                        <button type="button" onClick={() => openProject(p.id)}>
                          {p.title}
                        </button>
                        <span className="career-when mono">
                          {dotted(p.startDate)} — {p.endDate ? dotted(p.endDate) : '현재'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </JsonCard>

          <JsonCard name="basic" note="기본 정보" open="{">
            <Row k="이름">윤경호 · Yun GyoungHo</Row>
            <Row k="이메일">
              <a href="mailto:zxcvting1@gmail.com">zxcvting1@gmail.com</a>
            </Row>
            <Row k="전공">조선대학교 컴퓨터공학과</Row>
            <Row k="졸업">
              <span className="json-num mono">2024</span>
            </Row>
            <Row k="GPA">
              <span className="json-num mono">3.52</span>
            </Row>
          </JsonCard>

          <JsonCard name="training" note="교육 · 훈련" open="[">
            <Row k="2023—2024">
              <button
                type="button"
                className="cert-link"
                onClick={() =>
                  open('학부연구생 참여연구원확인서', '/images/etc/참여연구원확인서_윤경호.pdf')
                }
              >
                학부연구생
              </button>
              <span className="json-sub">Intelligent Networking Lab</span>
            </Row>
            <Row k="2024">
              <button
                type="button"
                className="cert-link"
                onClick={() => open('LG Aimers 4기 수료증', '/images/etc/경호_LG AI 수료증.pdf')}
              >
                LG Aimers 4기
              </button>
              <span className="json-sub">LG</span>
            </Row>
            <Row k="2025">
              SSAFY 13기
              <span className="json-sub">Samsung · MultiCampus</span>
            </Row>
            <Row k="2025-06">
              SQLD
              <span className="json-sub">Kdata</span>
            </Row>
          </JsonCard>

          <JsonCard name="publications" note="논문 · 대회" open="[" wide>
            <div className="paper">
              <span className="paper-venue mono">IPIU 2024</span>
              <p>
                XR 기반 실시간 의학 실습 교육 플랫폼에서의 프로세스 지연 최적화를 위한 서버
                네트워크 설계 및 구현
              </p>
            </div>
            <div className="paper">
              <span className="paper-venue mono">KICS 2024</span>
              <p>클라우드 서비스 기반 저비용 위성 기지국 설계 및 데이터 수신 시스템 개발</p>
            </div>
            <div className="paper">
              <span className="paper-venue mono">2025-08</span>
              <p>신한 해커톤 with SSAFY · 본선 진출</p>
            </div>
          </JsonCard>
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
