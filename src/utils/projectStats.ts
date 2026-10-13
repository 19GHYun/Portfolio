// projectStats.ts - projects.ts 에서 직접 계산하는 집계값
//
// 히어로와 푸터의 계측값을 손으로 적지 않고 데이터에서 뽑는다.
// 프로젝트를 추가하면 숫자가 알아서 따라 올라간다.

import { projects } from '../data/projects';

const year = (value: string): number => Number(value.slice(0, 4));

export const stats = {
  total: projects.length,
  active: projects.filter((p) => p.status === 'in-progress').length,
  firstYear: Math.min(...projects.map((p) => year(p.startDate))),
  lastYear: Math.max(
    ...projects.map((p) => year(p.endDate || p.startDate)),
    new Date().getFullYear()
  ),
};
