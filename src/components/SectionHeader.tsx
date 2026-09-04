import React from 'react';

interface SectionHeaderProps {
  /** 섹션 번호. 'SEC 02' 처럼 계측기 채널 번호처럼 쓴다 */
  index: string;
  title: string;
  /** 우측 상단 계측값. 예: '13 ENTRIES' */
  meta?: string;
  /** 제목 아래 설명 */
  lead?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  title,
  meta,
  lead,
}) => (
  <div className="section-head">
    <div className="section-head-rule">
      <span className="section-index">{index}</span>
      {meta && <span className="section-meta">{meta}</span>}
    </div>
    <h2 className="section-title">{title}</h2>
    {lead && <p className="section-lead">{lead}</p>}
  </div>
);

export default SectionHeader;
