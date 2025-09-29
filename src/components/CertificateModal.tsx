import React from 'react';
import './CertificateModal.css';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfPath: string;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  title,
  pdfPath
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="certificate-modal-backdrop" onClick={handleBackdropClick}>
      <div className="certificate-modal">
        <div className="certificate-modal-header">
          <h3>{title}</h3>
          <button className="certificate-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="certificate-modal-content">
          <iframe
            src={pdfPath}
            title={title}
            width="100%"
            height="600px"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;