// career.ts - 경력
//
// 회사명은 공개하지 않고 분야로만 적는다.
// 이 경력에 속한 프로젝트는 projects.ts 에서 context 가 같은 항목을 자동으로 모은다.

import { ProjectContext } from '../types/Project';

export interface CareerEntry {
  /** 'YYYY-MM' */
  start: string;
  /** 비우면 재직 중 */
  end?: string;
  role: string;
  org: string;
  context: ProjectContext;
}

export const CAREER: CareerEntry[] = [
  {
    start: '2025-10',
    role: '연구원',
    org: '방산 · 전자전 분야 기업',
    context: 'company',
  },
];
