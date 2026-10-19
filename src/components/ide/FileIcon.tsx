import React from 'react';
import { FileKind } from '../../data/explorer';
import { IconBranch, IconFolderOpen } from './icons';

/** 파일 종류별 아이콘. VS Code 기본 아이콘 테마처럼 확장자마다 색과 글자를 다르게 한다 */
const FileIcon: React.FC<{ kind: FileKind }> = ({ kind }) => {
  if (kind === 'git') {
    return (
      <span className="file-icon git">
        <IconBranch size={14} />
      </span>
    );
  }
  if (kind === 'folder') {
    return (
      <span className="file-icon folder">
        <IconFolderOpen size={15} />
      </span>
    );
  }
  const glyph = { md: 'M↓', json: '{}', ts: 'TS' }[kind];
  return (
    <span className={`file-icon ${kind}`} aria-hidden="true">
      {glyph}
    </span>
  );
};

export default FileIcon;
