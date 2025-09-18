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