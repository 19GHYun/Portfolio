// profile.ts - 프로필 카드와 이력 타임라인
//
// 경력(career.ts)은 회사 프로젝트를 자동으로 모으기 때문에 따로 두고,
// 나머지 이력은 여기에 시간 역순으로 적는다.

export const BASIC = {
  name: '윤경호',
  latin: 'Yun GyoungHo',
  role: '연구원 · 방산 · 전자전 분야',
  email: 'zxcvting1@gmail.com',
  school: '조선대학교 컴퓨터공학과',
  graduated: '2024',
  gpa: '3.52',
};

export const LINKS = [
  { label: 'GitHub', href: 'https://github.com/19GHYun' },
  { label: 'solved.ac', href: 'https://solved.ac/profile/zxcvting1' },
];

export type TimelineKind = 'edu' | 'paper' | 'award' | 'cert' | 'lab';

export const KIND_LABEL: Record<TimelineKind, string> = {
  edu: '교육',
  paper: '논문',
  award: '수상',
  cert: '자격',
  lab: '연구',
};

export interface TimelineItem {
  /** 'YYYY' 또는 'YYYY-MM' */
  when: string;
  /** 기간이면 끝 */
  until?: string;
  kind: TimelineKind;
  title: string;
  sub?: string;
  /** 누르면 열리는 증빙 PDF */
  pdf?: { title: string; path: string };
}

export const TIMELINE: TimelineItem[] = [
  {
    when: '2025-08',
    kind: 'award',
    title: '신한 해커톤 with SSAFY · 본선 진출',
    sub: 'BNPL 대학생 공동구매 플랫폼',
  },
  {
    when: '2025-06',
    kind: 'cert',
    title: 'SQLD',
    sub: 'Kdata',
  },
  {
    when: '2025',
    kind: 'edu',
    title: 'SSAFY 13기',
    sub: 'Samsung · MultiCampus',
  },
  {
    when: '2024',
    kind: 'edu',
    title: 'LG Aimers 4기',
    sub: 'LG',
    pdf: { title: 'LG Aimers 4기 수료증', path: '/images/etc/경호_LG AI 수료증.pdf' },
  },
  {
    when: '2024',
    kind: 'paper',
    title: '클라우드 서비스 기반 저비용 위성 기지국 설계 및 데이터 수신 시스템 개발',
    sub: 'KICS 2024',
  },
  {
    when: '2024',
    kind: 'paper',
    title: 'XR 기반 실시간 의학 실습 교육 플랫폼에서의 프로세스 지연 최적화를 위한 서버 네트워크 설계 및 구현',
    sub: 'IPIU 2024',
  },
  {
    when: '2024',
    kind: 'edu',
    title: '조선대학교 컴퓨터공학과 졸업',
    sub: 'GPA 3.52',
  },
  {
    when: '2023',
    until: '2024',
    kind: 'lab',
    title: '학부연구생',
    sub: 'Intelligent Networking Lab',
    pdf: { title: '학부연구생 참여연구원확인서', path: '/images/etc/참여연구원확인서_윤경호.pdf' },
  },
];
