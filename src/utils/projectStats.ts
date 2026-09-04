// projectStats.ts - projects.ts 에서 직접 계산하는 집계값
//
// 히어로의 계측값과 스킬 섹션의 사용 횟수를 손으로 적지 않고 데이터에서 뽑는다.
// 프로젝트를 추가하면 숫자가 알아서 따라 올라간다.

import { projects } from '../data/projects';

const year = (value: string): number => Number(value.slice(0, 4));

export const stats = {
  total: projects.length,
  active: projects.filter((p) => p.status === 'in-progress').length,
  completed: projects.filter((p) => p.status === 'completed').length,
  firstYear: Math.min(...projects.map((p) => year(p.startDate))),
  lastYear: Math.max(
    ...projects.map((p) => year(p.endDate || p.startDate)),
    new Date().getFullYear()
  ),
  technologies: new Set(
    projects.flatMap((p) => p.technologies.map((t) => t.trim().toLowerCase()))
  ).size,
  // 혼자 처음부터 끝까지 맡은 프로젝트
  solo: projects.filter((p) => p.teamSize === 1).length,
};

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * 스킬 이름이 프로젝트 기술 스택에 등장하는 횟수.
 *
 * 'Java' 가 'JavaScript' 에 걸리지 않도록 앞뒤를 경계로 막는다.
 * 'JavaScript/TypeScript' 처럼 슬래시로 묶인 이름은 각각 따로 본다.
 */
export const countProjectsUsing = (skill: string): number => {
  const tokens = skill
    .split('/')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  if (!tokens.length) return 0;

  const patterns = tokens.map(
    (token) =>
      new RegExp(
        `(^|[^a-z0-9+#.])${escapeRegExp(token)}($|[^a-z0-9+#.])`,
        'i'
      )
  );

  return projects.filter((project) =>
    project.technologies.some((tech) =>
      patterns.some((re) => re.test(tech.toLowerCase()))
    )
  ).length;
};
