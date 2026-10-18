import { useEffect } from 'react';

/**
 * .reveal 요소를 스크롤 진입 시 서서히 노출시킨다.
 *
 * 중요한 전제: 기본 상태는 "보임"이다.
 * JS가 뜨고 나서야 <html> 에 js-reveal 을 붙이고, 그때부터 숨김 상태가 적용된다.
 * 스크립트가 실패하거나 IntersectionObserver 가 동작하지 않는 환경에서도
 * 내용이 사라지지 않고 그냥 정적으로 보인다.
 *
 * 필터를 바꿔서 나중에 생긴 카드도 놓치지 않도록 DOM 변화를 지켜보며 새 요소를 관찰에 넣는다.
 * 관찰이 어떤 이유로든 콜백을 주지 않는 경우를 대비해, 새 요소는 일정 시간 뒤 무조건 노출된다.
 */
const FAILSAFE_MS = 1600;

export const useReveal = (): void => {
  useEffect(() => {
    const root = document.documentElement;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const showAll = () =>
      document
        .querySelectorAll<HTMLElement>('.reveal')
        .forEach((el) => el.classList.add('is-visible'));

    // 애니메이션을 쓸 수 없는 상황이면 숨기지도 않는다
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      showAll();
      return;
    }

    // 여기서부터 숨김 상태가 활성화된다
    root.classList.add('js-reveal');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    const timers: number[] = [];
    const seen = new WeakSet<Element>();

    const track = () => {
      const fresh = Array.from(
        document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
      ).filter((el) => !seen.has(el));
      if (!fresh.length) return;
      fresh.forEach((el) => {
        seen.add(el);
        io.observe(el);
      });
      // 관찰이 동작하지 않는 환경(백그라운드 탭, 일부 임베드 뷰 등)에서
      // 내용이 영영 안 보이는 것을 막는 안전장치
      timers.push(
        window.setTimeout(() => {
          fresh.forEach((el) => el.classList.add('is-visible'));
        }, FAILSAFE_MS)
      );
    };

    track();
    // 바뀔 때마다 훑지 않고 잠깐 모아서 한 번에.
    // requestAnimationFrame 은 숨은 탭이나 일부 임베드 뷰에서 아예 돌지 않아서 타이머를 쓴다
    let pendingScan = 0;
    const mo = new MutationObserver(() => {
      if (pendingScan) return;
      pendingScan = window.setTimeout(() => {
        pendingScan = 0;
        track();
      }, 60);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(pendingScan);
      timers.forEach((t) => window.clearTimeout(t));
      mo.disconnect();
      io.disconnect();
    };
  }, []);
};

export default useReveal;
