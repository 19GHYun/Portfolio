import { useEffect } from 'react';

/**
 * .reveal 요소를 스크롤 진입 시 서서히 노출시킨다.
 *
 * 중요한 전제: 기본 상태는 "보임"이다.
 * JS가 뜨고 나서야 <html> 에 js-reveal 을 붙이고, 그때부터 숨김 상태가 적용된다.
 * 스크립트가 실패하거나 IntersectionObserver 가 동작하지 않는 환경에서도
 * 내용이 사라지지 않고 그냥 정적으로 보인다.
 *
 * 추가로, 관찰이 어떤 이유로든 콜백을 주지 않는 경우를 대비해
 * 일정 시간 뒤에는 남은 요소를 모두 노출시킨다.
 */
const FAILSAFE_MS = 1600;

export const useReveal = (): void => {
  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

    const revealAll = () => targets.forEach((el) => el.classList.add('is-visible'));

    if (!targets.length) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // 애니메이션을 쓸 수 없는 상황이면 숨기지도 않는다
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      revealAll();
      return;
    }

    // 여기서부터 숨김 상태가 활성화된다
    root.classList.add('js-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    targets.forEach((el) => observer.observe(el));

    // 관찰이 동작하지 않는 환경(백그라운드 탭, 일부 임베드 뷰 등)에서
    // 내용이 영영 안 보이는 것을 막는 안전장치
    const failsafe = window.setTimeout(revealAll, FAILSAFE_MS);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);
};

export default useReveal;
