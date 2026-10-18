import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CAREER } from '../data/career';
import { projects } from '../data/projects';
import { BASIC, KIND_LABEL, LINKS, TIMELINE } from '../data/profile';
import { byNewest, dotted, periodText } from '../utils/projectMeta';
import { rememberScroll } from '../utils/scrollMemory';
import CopyEmail from './CopyEmail';
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
  const [modal, setModal] = useState<ModalState>({ isOpen: false, title: '', pdfPath: '' });
  const navigate = useNavigate();

  const openProject = (id: string) => {
    rememberScroll('/');
    navigate(`/project/${id}`);
  };

  const close = () => setModal({ isOpen: false, title: '', pdfPath: '' });

  return (
    <section id="profile" className="section">
      <div className="container">
        <SectionHeader index="SEC 02" title="프로필" meta="IDENTITY" />

        <div className="profile-layout">
          {/* 신분증처럼 생긴 기본 정보 */}
          <aside className="id-card panel reveal">
            <div className="id-card-bar">
              <span className="mono-label">ID · OPERATOR</span>
              <span className="id-card-led">
                <span className="led active" aria-hidden="true" />
                ON DUTY
              </span>
            </div>

            <div className="id-card-head">
              <div className="id-card-mark" aria-hidden="true">
                <span>윤</span>
              </div>
              <div>
                <div className="id-card-name">{BASIC.name}</div>
                <div className="id-card-latin mono-label">{BASIC.latin}</div>
                <div className="id-card-role">{BASIC.role}</div>
              </div>
            </div>

            <div className="id-card-body">
              <div className="readout-row">
                <span className="readout-key">이메일</span>
                <span className="readout-value">
                  <a href={`mailto:${BASIC.email}`}>{BASIC.email}</a>
                </span>
              </div>
              <div className="readout-row">
                <span className="readout-key">전공</span>
                <span className="readout-value">{BASIC.school}</span>
              </div>
              <div className="readout-row">
                <span className="readout-key">졸업</span>
                <span className="readout-value num">{BASIC.graduated}</span>
              </div>
              <div className="readout-row">
                <span className="readout-key">GPA</span>
                <span className="readout-value num">{BASIC.gpa}</span>
              </div>
            </div>

            <div className="id-card-actions">
              <CopyEmail className="btn btn-primary" />
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </aside>

          {/* 이력 타임라인 */}
          <div className="timeline reveal">
            {CAREER.map((job) => {
              const work = projects.filter((p) => p.context === job.context).sort(byNewest);
              return (
                <div key={job.start} className="tl-item is-career">
                  <div className="tl-when readout">
                    {dotted(job.start)}
                    <span>— {job.end ? dotted(job.end) : '현재'}</span>
                  </div>
                  <div className="tl-node" aria-hidden="true" />
                  <div className="tl-card panel">
                    <div className="tl-head">
                      <span className="tl-kind is-career">경력</span>
                      {!job.end && (
                        <span className="tl-now">
                          <span className="led active" aria-hidden="true" />
                          재직 중
                        </span>
                      )}
                    </div>
                    <h3 className="tl-title">
                      {job.role} <span>· {job.org}</span>
                    </h3>
                    <ul className="tl-work">
                      {work.map((p) => (
                        <li key={p.id}>
                          <button type="button" onClick={() => openProject(p.id)}>
                            <span className="tl-work-title">{p.title}</span>
                            <span className="tl-work-when readout-sm">{periodText(p)}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}

            {TIMELINE.map((item, i) => (
              <div key={`${item.when}-${i}`} className={`tl-item is-${item.kind}`}>
                <div className="tl-when readout">
                  {dotted(item.when)}
                  {item.until && <span>— {dotted(item.until)}</span>}
                </div>
                <div className="tl-node" aria-hidden="true" />
                <div className="tl-card is-flat">
                  <div className="tl-head">
                    <span className={`tl-kind is-${item.kind}`}>{KIND_LABEL[item.kind]}</span>
                    {item.sub && <span className="tl-sub">{item.sub}</span>}
                  </div>
                  <p className="tl-title is-small">
                    {item.pdf ? (
                      <button
                        type="button"
                        className="cert-link"
                        onClick={() =>
                          setModal({ isOpen: true, title: item.pdf!.title, pdfPath: item.pdf!.path })
                        }
                      >
                        {item.title}
                      </button>
                    ) : (
                      item.title
                    )}
                  </p>
                </div>
              </div>
            ))}
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
