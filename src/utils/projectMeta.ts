// projectMeta.ts - 여러 화면이 같이 쓰는 프로젝트 라벨과 계산
//
// 카드, 대표 작업, 워크 맵, 상세 페이지가 같은 이름과 같은 순서를 쓰도록 한 곳에 둔다.

import { projects } from '../data/projects';
import { Project, ProjectContext } from '../types/Project';
import { getProjectImages, ProjectImage } from './projectImages';

export const CATEGORY_LABEL: Record<Project['category'], string> = {
  research: '연구',
  hardware: '하드웨어',
  mobile: '모바일',
  desktop: '데스크톱',
  web: '웹',
  ai: 'AI',
  game: '게임',
  etc: '기타',
};

export const CATEGORY_CODE: Record<Project['category'], string> = {
  research: 'RESEARCH',
  hardware: 'HARDWARE',
  mobile: 'MOBILE',
  desktop: 'DESKTOP',
  web: 'WEB',
  ai: 'AI/ML',
  game: 'GAME',
  etc: 'ETC',
};

export const CATEGORY_ORDER: Project['category'][] = [
  'research',
  'hardware',
  'mobile',
  'desktop',
  'web',
  'ai',
  'game',
  'etc',
];

export const STATUS_LABEL: Record<Project['status'], string> = {
  completed: '완료',
  'in-progress': '진행중',
  planned: '계획',
};

/** 맥락 필터와 범례에 쓰는 순서. 학부 · 연구실은 연구실 색을 같이 쓴다 */
export const CONTEXT_ORDER: ProjectContext[] = [
  'company',
  'personal',
  'ssafy',
  'lab',
  'undergrad-lab',
  'undergrad',
];

/** CSS 변수 이름 (--ctx-*) */
export const contextColorVar = (context: ProjectContext): string => {
  const key = context === 'undergrad-lab' ? 'lab' : context;
  return `var(--ctx-${key})`;
};

/** 'YYYY-MM' -> 'YYYY.MM' */
export const dotted = (value: string): string => value.replace('-', '.');

export const periodText = (p: Project): string =>
  `${dotted(p.startDate)} — ${p.endDate ? dotted(p.endDate) : '현재'}`;

export const teamText = (p: Project): string =>
  p.teamSize === 1 ? '단독' : `${p.teamSize}인`;

/** 'YYYY-MM' -> 절대 개월 수 */
export const toMonthIndex = (value: string): number => {
  const [year, month] = value.split('-').map(Number);
  return year * 12 + (month - 1);
};

const startOf = (p: Project) => toMonthIndex(p.startDate);

/** 최신순 (시작이 늦은 것부터, 같으면 id 큰 것부터) */
export const byNewest = (a: Project, b: Project): number =>
  startOf(b) - startOf(a) || Number(b.id) - Number(a.id);

/** projects.ts 에 직접 적은 이미지 + src/assets/projects/<id>/ 에서 모은 이미지 */
export const imagesOf = (p: Project): ProjectImage[] => [
  ...(p.images || []).map((src, i) => ({
    src,
    description: p.imageDescriptions?.[i] || '',
  })),
  ...getProjectImages(p.id),
];

export const thumbOf = (p: Project): string | null => {
  const all = imagesOf(p);
  return all.length ? all[0].src : null;
};

/** 대표 작업. 최신 것부터 (GitHub 프로필의 스펠카드 순서와 같다) */
export const featuredProjects = (): Project[] =>
  projects.filter((p) => p.featured).sort(byNewest);

/** 목록에서 앞뒤 프로젝트 (최신순 기준) */
export const neighborsOf = (id: string): { prev?: Project; next?: Project } => {
  const list = [...projects].sort(byNewest);
  const i = list.findIndex((p) => p.id === id);
  if (i < 0) return {};
  return { prev: list[i - 1], next: list[i + 1] };
};
