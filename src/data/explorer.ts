// explorer.ts - 탐색기 · 탭 · 명령 팔레트에 보이는 '파일' 이름
//
// 메인 페이지의 섹션과 프로젝트를 저장소 안 파일처럼 보여 준다.
// 프로젝트를 새로 추가했는데 여기 이름이 없으면 project-<id>.md 로 표시된다.

import { projects } from './projects';
import { Project } from '../types/Project';

export type FileKind = 'md' | 'json' | 'ts' | 'git' | 'folder';

export interface SectionFile {
  /** 메인 페이지의 섹션 id */
  id: string;
  file: string;
  kind: FileKind;
  /** 한글 이름. 명령 팔레트 검색과 툴팁에 쓴다 */
  label: string;
}

export const SECTION_FILES: SectionFile[] = [
  { id: 'about', file: 'README.md', kind: 'md', label: '소개' },
  { id: 'profile', file: 'profile.json', kind: 'json', label: '프로필' },
  { id: 'skills', file: 'skills.ts', kind: 'ts', label: '기술' },
  { id: 'workmap', file: 'timeline.git', kind: 'git', label: '타임라인' },
  { id: 'projects', file: 'projects', kind: 'folder', label: '프로젝트' },
];

export const SECTION_IDS = SECTION_FILES.map((s) => s.id);

const PROJECT_FILES: Record<string, string> = {
  '1': 'vr-medical-multiplayer',
  '2': 'low-cost-ground-station',
  '3': 'portfolio-site',
  '4': 'orange-mushroom-escape',
  '5': 'nfc-biosensor-app',
  '6': 'nestquest',
  '7': 'yolo-bring-it',
  '8': 'awnas',
  '9': 'shinhan-bnpl-groupbuy',
  '10': 'plate-pay',
  '11': 'tactical-sa-plugin',
  '12': 'rf-signal-tools',
  '13': 'touhou-mahjong-war',
  '14': 'gomin-bot',
  '15': 'reimu-calendar',
  '16': 'hokora',
  '17': 'inflation-rpg',
};

export const projectFile = (project: Pick<Project, 'id'>): string =>
  `${PROJECT_FILES[project.id] ?? `project-${project.id}`}.md`;

const startOf = (p: Project) => p.startDate;

/** 대표 프로젝트를 먼저, 그 안에서는 최신순. 목록의 기본 정렬과 같다 */
export const orderedProjects: Project[] = [...projects].sort((a, b) => {
  if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
  return startOf(b).localeCompare(startOf(a));
});

/** 최근 시작한 순서 */
export const recentProjects: Project[] = [...projects].sort((a, b) =>
  startOf(b).localeCompare(startOf(a))
);
