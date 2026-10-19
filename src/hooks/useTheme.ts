import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { canTransition, guardTransition } from '../utils/viewTransition';

/**
 * 다크 / 라이트 테마.
 *
 * - 처음에는 저장해 둔 선택, 없으면 운영체제 설정을 따른다.
 *   (index.html 의 인라인 스크립트가 React 보다 먼저 같은 규칙으로 data-theme 을 붙여 깜빡임을 막는다)
 * - 바꿀 때는 View Transition 으로 누른 자리에서 원이 퍼지며 새 테마가 드러난다.
 */

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'ygh-theme';
const META_COLOR: Record<Theme, string> = { light: '#f8f8f8', dark: '#181818' };

const readStored = (): Theme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
};

const systemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

const initialTheme = (): Theme => {
  const attr = document.documentElement.dataset.theme;
  if (attr === 'light' || attr === 'dark') return attr;
  return readStored() ?? systemTheme();
};

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', META_COLOR[theme]);
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // 직접 고른 적이 없으면 운영체제 설정이 바뀔 때 따라간다
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => {
      if (!readStored()) setTheme(mq.matches ? 'light' : 'dark');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // 저장이 막힌 환경에서도 이번 화면에서는 바뀐다
      }

      if (!canTransition()) {
        setTheme(next);
        return;
      }

      const x = origin?.x ?? window.innerWidth - 40;
      const y = origin?.y ?? 20;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const root = document.documentElement;
      root.classList.add('vt-theme');

      const transition = guardTransition(
        document.startViewTransition!(() => {
          flushSync(() => setTheme(next));
          applyTheme(next);
        })
      );

      transition.ready
        .then(() => {
          root.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 520,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          );
        })
        .catch(() => undefined);

      transition.finished
        .finally(() => root.classList.remove('vt-theme'))
        .catch(() => undefined);
    },
    [theme]
  );

  return { theme, toggle };
};

export default useTheme;
