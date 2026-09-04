// Project.ts - 프로젝트 데이터 타입 정의

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'desktop' | 'ai' | 'research' | 'etc' | 'hardware';
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
  teamSize: number;
  myRole: string;
  /** 카드와 상세 상단에 크게 띄울 대표 수치. 2~3개가 적당하다 */
  metrics?: { label: string; value: string }[];
  features: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  images: string[];
  imageDescriptions?: string[];
  demoUrl?: string;
  githubUrl?: string;
  youtubeUrl?: string;
  namuWikiUrl?: string;
  documentation?: string;
  reflection?: string;
}