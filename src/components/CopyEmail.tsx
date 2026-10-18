import React, { useEffect, useRef, useState } from 'react';
import { BASIC } from '../data/profile';

interface CopyEmailProps {
  className?: string;
  /** 버튼에 보일 글자. 비우면 '이메일 복사' */
  label?: string;
}

/**
 * 이메일 주소를 클립보드에 복사하는 버튼.
 * 클립보드를 쓸 수 없는 환경(권한 거부, http)에서는 메일 앱을 연다.
 */
const CopyEmail: React.FC<CopyEmailProps> = ({ className, label }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(BASIC.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${BASIC.email}`;
    }
  };

  return (
    <button
      type="button"
      className={`${className || ''} ${copied ? 'is-copied' : ''}`}
      onClick={copy}
      aria-live="polite"
    >
      {copied ? '복사됨 ✓' : label || '이메일 복사'}
    </button>
  );
};

export default CopyEmail;
