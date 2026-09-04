import React, { useCallback, useEffect } from 'react';
import './ImageLightbox.css';

export interface LightboxImage {
  src: string;
  description: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  index,
  onClose,
  onNavigate,
}) => {
  const image = images[index];
  const hasMultiple = images.length > 1;

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  // 키보드 조작: ESC 닫기, 좌우 방향키 이동
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasMultiple) goPrev();
      if (e.key === 'ArrowRight' && hasMultiple) goNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goPrev, goNext, hasMultiple]);

  // 라이트박스가 열려 있는 동안 뒤쪽 페이지 스크롤 잠금
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  if (!image) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="lightbox-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={image.description || '프로젝트 이미지'}
    >
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="닫기"
      >
        ×
      </button>

      {hasMultiple && (
        <button
          type="button"
          className="lightbox-nav prev"
          onClick={goPrev}
          aria-label="이전 이미지"
        >
          ‹
        </button>
      )}

      <figure className="lightbox-figure" onClick={handleBackdropClick}>
        <img
          className="lightbox-image"
          src={image.src}
          alt={image.description || '프로젝트 이미지'}
        />
        <figcaption className="lightbox-caption">
          {image.description && (
            <span className="lightbox-caption-text">{image.description}</span>
          )}
          {hasMultiple && (
            <span className="lightbox-counter">
              {index + 1} / {images.length}
            </span>
          )}
        </figcaption>
      </figure>

      {hasMultiple && (
        <button
          type="button"
          className="lightbox-nav next"
          onClick={goNext}
          aria-label="다음 이미지"
        >
          ›
        </button>
      )}
    </div>
  );
};

export default ImageLightbox;
