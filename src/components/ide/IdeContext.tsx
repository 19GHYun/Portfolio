import React, { createContext, useContext } from 'react';
import { Theme } from '../../hooks/useTheme';

/**
 * 작업 화면 어디서나 쓰는 동작 모음.
 * 섹션 컴포넌트가 명령 팔레트를 열거나 프로젝트 파일을 여는 데 쓴다.
 */
export interface IdeActions {
  theme: Theme;
  toggleTheme: (origin?: { x: number; y: number }) => void;
  openPalette: () => void;
  /** 메인 페이지의 섹션으로 이동. 상세 페이지에 있으면 메인으로 돌아가서 이동한다 */
  goToSection: (id: string) => void;
  /** 프로젝트 상세 열기. 메인에서 열면 돌아올 위치를 기억해 둔다 */
  openProject: (id: string) => void;
  /** 상세에서 목록으로. 보던 자리가 있으면 거기로 */
  backToList: () => void;
}

export const IdeContext = createContext<IdeActions | null>(null);

export const useIde = (): IdeActions => {
  const value = useContext(IdeContext);
  if (!value) throw new Error('useIde 는 IdeLayout 안에서만 쓸 수 있다');
  return value;
};

/** 버튼을 누른 위치. 테마 전환 원이 여기서 퍼진다 */
export const originOf = (e: React.MouseEvent): { x: number; y: number } => {
  if (e.clientX || e.clientY) return { x: e.clientX, y: e.clientY };
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
};

export const isMac = (): boolean =>
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);
