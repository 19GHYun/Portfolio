import React, { useEffect, useRef } from 'react';
import { IconClose } from './ide/icons';
import './CertificateModal.css';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfPath: string;
}

/**
 * 증명서 PDF 보기. 네이티브 <dialog> 라서 Esc 닫기와 포커스 가두기를 브라우저가 맡고,
 * 맨 위 레이어(top layer)에 떠서 어떤 부모 레이아웃에도 갇히지 않는다.
 */
const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, title, pdfPath }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      className="cert-dialog"
      aria-label={title}
      onClose={onClose}
      onMouseDown={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="cert-head">
        <span className="cert-title mono">{title}.pdf</span>
        <button type="button" className="cert-close" onClick={onClose} aria-label="닫기">
          <IconClose size={15} />
        </button>
      </div>
      {isOpen && <iframe className="cert-frame" src={pdfPath} title={title} />}
    </dialog>
  );
};

export default CertificateModal;
