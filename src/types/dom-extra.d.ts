// dom-extra.d.ts - TypeScript 4.9 의 lib.dom 에 아직 없는 브라우저 API 선언
//
// View Transitions API: 지원하지 않는 브라우저도 있으므로 선택 메서드로 둔다.

interface ViewTransition {
  readonly finished: Promise<void>;
  readonly ready: Promise<void>;
  readonly updateCallbackDone: Promise<void>;
  skipTransition(): void;
}

interface Document {
  startViewTransition?(update: () => void | Promise<void>): ViewTransition;
}
