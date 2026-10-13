import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { recallScroll } from '../utils/scrollMemory';

// 페이지 이동 시 스크롤 위치를 정한다.
//
// - 새 페이지로 가면(PUSH · REPLACE) 맨 위에서 시작한다.
// - 뒤로가기(POP)나 '목록으로' 버튼으로 돌아오면, 떠나기 전에 보던 위치로 보낸다.
// - 'instant' 를 명시하는 이유: html 에 scroll-behavior: smooth 가 걸려 있어서,
//   그냥 scrollTo 를 부르면 맨 아래에서 열린 뒤 위로 미끄러져 올라가고
//   브라우저에 따라서는 그 애니메이션이 끊겨 아래에 머문다.
const jump = (top: number) =>
  window.scrollTo({ top, left: 0, behavior: 'instant' as ScrollBehavior });

const ScrollToTopOnMount: React.FC = () => {
  const { pathname, state } = useLocation();
  const navigationType = useNavigationType();
  const restoreRequested = Boolean(
    (state as { restoreScroll?: boolean } | null)?.restoreScroll
  );

  useEffect(() => {
    const saved = recallScroll(pathname);

    if ((navigationType === 'POP' || restoreRequested) && saved !== undefined) {
      jump(saved);
      return;
    }

    // 처음 열거나 새로고침한 경우(POP, 기억한 위치 없음)는 브라우저에 맡긴다
    if (navigationType === 'POP') return;

    jump(0);
  }, [pathname, navigationType, restoreRequested]);

  return null;
};

export default ScrollToTopOnMount;
