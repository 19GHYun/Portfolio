import { useEffect, useState } from 'react';

/**
 * 지금 화면 가운데쯤 걸쳐 있는 섹션의 id.
 * 탐색기 · 탭 · 상태 표시줄이 '지금 열려 있는 파일'을 표시하는 데 쓴다.
 */
export const useActiveSection = (ids: string[], enabled: boolean): string => {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(',');

  useEffect(() => {
    if (!enabled) return;

    const sections = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length || typeof IntersectionObserver === 'undefined') return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });

        // 화면 위쪽 띠에 걸린 섹션 중 문서 순서상 첫 번째
        const first = sections.find((el) => visible.has(el.id));
        if (first) setActive(first.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.01] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, enabled]);

  return active;
};

export default useActiveSection;
