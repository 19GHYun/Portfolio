import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { recallScroll } from '../utils/scrollMemory';

// 페이지 이동 시 스크롤 위치를 정한다.
//
// - 새 페이지로 가면(PUSH · REPLACE) 맨 위에서 시작한다.
// - 뒤로가기(POP)나 '목록으로'로 돌아오면, 떠나기 전에 보던 위치로 보낸다.
// - 상세에서 탐색기로 섹션을 고르면(state.scrollTo) 그 섹션으로 바로 간다.
// - 'instant' 를 명시하는 이유: html 에 scroll-behavior: smooth 가 걸려 있어서,
//   그냥 scrollTo 를 부르면 맨 아래에서 열린 뒤 위로 미끄러져 올라간다.
// - useLayoutEffect 인 이유: 화면 전환(View Transition)이 새 화면을 찍기 전에
//   스크롤 위치가 정해져 있어야 엉뚱한 위치가 한 번 비치지 않는다.
const jump = (top: number) =>
  window.scrollTo({ top, left: 0, behavior: 'instant' as ScrollBehavior });

interface NavState {
  restoreScroll?: boolean;
  scrollTo?: string;
}

const ScrollToTopOnMount: React.FC = () => {
  const { pathname, state, key } = useLocation();
  const navigationType = useNavigationType();
  const navState = (state as NavState | null) ?? {};

  useLayoutEffect(() => {
    if (navState.scrollTo) {
      const target = document.getElementById(navState.scrollTo);
      if (target) {
        target.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
        return;
      }
    }

    const saved = recallScroll(pathname);

    if ((navigationType === 'POP' || navState.restoreScroll) && saved !== undefined) {
      jump(saved);
      return;
    }

    // 처음 열거나 새로고침한 경우(POP, 기억한 위치 없음)는 브라우저에 맡긴다
    if (navigationType === 'POP') return;

    jump(0);
    // 같은 경로로 다시 이동해도(key 변경) 처리되도록 key 를 의존성에 둔다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, navigationType, key]);

  return null;
};

export default ScrollToTopOnMount;
