// Project.ts - 프로젝트 데이터 타입 정의

export type ProjectContext =
  | 'company'
  | 'personal'
  | 'ssafy'
  | 'lab'
  | 'undergrad'
  | 'undergrad-lab';

export const CONTEXT_LABEL: Record<ProjectContext, string> = {
  company: '회사',
  personal: '개인',
  ssafy: 'SSAFY',
  lab: '연구실',
  undergrad: '학부',
  'undergrad-lab': '학부 · 연구실',
};

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'desktop' | 'ai' | 'research' | 'etc' | 'hardware' | 'game';
  /** 어디서 한 작업인지. 회사 업무인지 개인 작업인지 구분되도록 카드와 상세에 표시한다 */
  context: ProjectContext;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
  teamSize: number;
  myRole: string;
  /** 대표 프로젝트. 기본 정렬에서 맨 앞에 고정되고 카드에 '대표' 표시가 붙는다 */
  featured?: boolean;
  /** 카드와 상세 상단에 크게 띄울 대표 수치. 2~3개가 적당하다 */
  metrics?: { label: string; value: string }[];
  features: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  images: string[];
  imageDescriptions?: string[];
  /** 첫 번째 이미지를 상세 페이지 위쪽에 큰 배너로 띄운다. 게임 타이틀처럼 가로로 긴 대표 그림용 */
  coverBanner?: boolean;
  demoUrl?: string;
  /** 공개한 게임의 소개 · 다운로드 페이지 */
  gameUrl?: string;
  githubUrl?: string;
  youtubeUrl?: string;
  namuWikiUrl?: string;
  documentation?: string;
  reflection?: string;
}