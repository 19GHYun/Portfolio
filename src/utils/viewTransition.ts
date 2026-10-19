// viewTransition.ts - 화면 바뀜을 View Transitions API 로 감싼다
//
// 지원하지 않는 브라우저나 '동작 줄이기' 설정에서는 그냥 바로 바꾼다.
// flushSync 로 React 렌더를 콜백 안에서 끝내야 브라우저가 바뀐 뒤의 화면을 찍을 수 있다.

import { flushSync } from 'react-dom';
import { NavigateFunction, NavigateOptions, To } from 'react-router-dom';

const reduceMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const canTransition = (): boolean =>
  typeof document.startViewTransition === 'function' && !reduceMotion();

// 브라우저가 화면을 그리지 못하는 상황(최소화된 창, 과부하 등)에서는 전환이
// 이전 화면을 찍는 단계에서 멈춰 페이지 이동까지 늦어진다. 잠깐 기다려도 시작하지 않으면
// 전환을 건너뛰어 내용부터 바꾼다.
const START_TIMEOUT_MS = 500;

const ignore = () => undefined;

export const guardTransition = (transition: ViewTransition): ViewTransition => {
  const timer = window.setTimeout(() => transition.skipTransition(), START_TIMEOUT_MS);
  transition.updateCallbackDone.finally(() => window.clearTimeout(timer)).catch(ignore);
  // 전환을 건너뛰면 ready / finished 가 거부되는데, 내용은 이미 바뀌었으니 조용히 넘긴다
  transition.ready.catch(ignore);
  transition.finished.catch(ignore);
  return transition;
};

export const withTransition = (update: () => void): ViewTransition | null => {
  if (!canTransition()) {
    update();
    return null;
  }
  return guardTransition(document.startViewTransition!(() => flushSync(update)));
};

export const transitionTo = (
  navigate: NavigateFunction,
  to: To,
  options?: NavigateOptions
): void => {
  withTransition(() => navigate(to, options));
};
