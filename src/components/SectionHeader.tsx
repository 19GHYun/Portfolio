import React from 'react';
import { FileKind } from '../data/explorer';
import FileIcon from './ide/FileIcon';

interface SectionHeaderProps {
  /** 이 섹션이 흉내 내는 파일 이름. 예: 'profile.json' */
  file: string;
  kind: FileKind;
  title: string;
  /** 파일 이름 옆에 붙는 짧은 정보. 예: '17 files' */
  meta?: string;
  /** 제목 아래 설명 */
  lead?: string;
}

/** 섹션 머리: 파일 경로 한 줄 + 제목 + 설명 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ file, kind, title, meta, lead }) => (
  <header className="pane-head">
    <div className="pane-path mono">
      <FileIcon kind={kind} />
      <span className="pane-file">{file}</span>
      {meta && <span className="pane-meta">{meta}</span>}
    </div>
    <h2 className="pane-title">{title}</h2>
    {lead && <p className="pane-lead">{lead}</p>}
  </header>
);

export default SectionHeader;
