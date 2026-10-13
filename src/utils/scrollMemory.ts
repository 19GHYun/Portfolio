// scrollMemory.ts - 목록에서 상세로 갈 때 보던 위치를 기억해 둔다
//
// BrowserRouter 는 스크롤 위치를 복원해 주지 않고, 브라우저 기본 복원도
// 돌아오는 순간에는 아직 짧은 상세 페이지 높이 기준이라 맨 위로 잘려 버린다.
// 그래서 상세로 떠나기 직전에 위치를 적어 두고, 돌아왔을 때 그 값으로 보낸다.

const saved = new Map<string, number>();

export const rememberScroll = (path: string): void => {
  saved.set(path, window.scrollY);
};

export const recallScroll = (path: string): number | undefined => saved.get(path);
