import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SECTION_FILES } from '../../data/explorer';

/**
 * 오른쪽 미니맵. 페이지 전체를 코드 줄처럼 축소해 보여 주고,
 * 지금 보이는 영역(슬라이더)은 CSS 스크롤 타임라인(animation-timeline: scroll())이 움직인다.
 * 이를 지원하지 않는 브라우저에서만 스크롤 이벤트로 위치를 맞춘다.
 * 누르면 그 위치로 이동한다.
 */

const LINE_COLORS = [
  'var(--syn-keyword)',
  'var(--syn-var)',
  'var(--syn-string)',
  'var(--syn-func)',
  'var(--fg-faint)',
  'var(--syn-type)',
  'var(--syn-comment)',
];

// 섹션마다 늘 같은 모양이 나오도록 아주 단순한 의사 난수
const pseudo = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

const Minimap: React.FC = () => {
  const [ratios, setRatios] = useState<number[]>(SECTION_FILES.map(() => 1));
  const [viewport, setViewport] = useState(0.15);
  const sliderRef = useRef<HTMLDivElement>(null);
  const timelineSupported = useMemo(
    () => typeof CSS !== 'undefined' && CSS.supports('animation-timeline: scroll()'),
    []
  );

  // 섹션 높이 비율과 화면 비율을 잰다
  useEffect(() => {
    const measure = () => {
      const total = document.documentElement.scrollHeight || 1;
      setViewport(Math.min(1, window.innerHeight / total));
      setRatios(
        SECTION_FILES.map((s) => {
          const el = document.getElementById(s.id);
          return el ? Math.max(el.offsetHeight / total, 0.02) : 0.05;
        })
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // 스크롤 타임라인을 못 쓰면 직접 위치를 옮긴다
  useEffect(() => {
    if (timelineSupported) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (sliderRef.current) {
        sliderRef.current.style.top = `calc((100% - var(--mm-h)) * ${p})`;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [timelineSupported]);

  const blocks = useMemo(
    () =>
      SECTION_FILES.map((s, si) => {
        const rand = pseudo(si * 97 + 13);
        const count = 14;
        return Array.from({ length: count }, (_, i) => ({
          indent: Math.floor(rand() * 4) * 6,
          width: 20 + rand() * 60,
          color: LINE_COLORS[Math.floor(rand() * LINE_COLORS.length)],
          key: `${s.id}-${i}`,
        }));
      }),
    []
  );

  const jump = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const p = (e.clientY - rect.top) / rect.height;
    const total = document.documentElement.scrollHeight;
    window.scrollTo({ top: p * total - window.innerHeight / 2, behavior: 'smooth' });
  };

  return (
    <div className="minimap" aria-hidden="true" onClick={jump}>
      <div className="mm-track">
        {blocks.map((lines, si) => (
          <div key={SECTION_FILES[si].id} className="mm-block" style={{ flexGrow: ratios[si] }}>
            {lines.map((l) => (
              <span
                key={l.key}
                className="mm-line"
                style={{ marginLeft: l.indent, width: `${l.width}%`, background: l.color }}
              />
            ))}
          </div>
        ))}
      </div>
      <div
        ref={sliderRef}
        className={`mm-slider ${timelineSupported ? 'is-timeline' : ''}`}
        style={{ ['--mm-h' as string]: `${viewport * 100}%` }}
      />
    </div>
  );
};

export default Minimap;
