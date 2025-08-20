// projects.ts - 프로젝트 데이터

import { Project } from '../types/Project';

export const projects: Project[] = [
  {
    id: '1',
    title: 'VR/AR 기반 의학 교육 플랫폼에서 다중접속 환경 개발',
    summary: 'Unity Photon서버를 이용한 다중접속 환경',
    description: 'XR 기술을 기반으로 한 실시간 의학 실습 교육 플랫폼에서 Photon서버를 이용하여 지연시간을 최적화 및 기능을 추가하는 연구를 진행하였다.',
    technologies: ['Unity', 'C#', 'Photon', 'PunRPC', 'Photon Network', 'Oculus Quest'],
    category: 'research',
    status: 'completed',
    startDate: '2023-08',
    endDate: '2024-08',
    teamSize: 1,
    myRole: '서버 네트워크 개발 및 최적화',
    features: [
      '실시간 XR 렌더링 최적화',
      '저지연 네트워크 통신 구현',
      '다중 사용자 동시 접속 지원(10인)',
      '실시간 데이터 동기화',
      '프로세스 지연 모니터링 시스템',
      '실습자 및 관찰자 시스템 구현',
      'TTA 시험 통과'
    ],
    challenges: [
      'XR 환경에서의 실시간 데이터 처리로 인한 높은 지연 시간',
      '다중 사용자 환경에서의 데이터 동기화 문제',
      '역할 변동을 기능 개발'
    ],
    solutions: [
      '서버 부하에 따른 서버 동적 증설 시스템 마련',
      'Photon View 및 PunRPC를 통한 데이터 동기화',
      '오큘러스의 B버튼을 누를 시 실습을 할 수 있는 왼손이 나오게 처리 및 역할 스위칭'
    ],
    results: [
      'IPIU 2024 학회 논문 발표',
      '동시 접속자 수 10인에서 TTA시험 통과',
    ],
    images: ['/images/xr-platform.jpg'],
    documentation: '/images/XR_논문.hwp'
  },
  {
    id: '2', 
    title: '저비용 위성 기지국 시스템',
    summary: '클라우드 서비스를 활용한 위성 데이터 수신 및 처리 시스템',
    description: '클라우드 기반 저비용 위성 기지국을 설계하고 위성 데이터를 실시간으로 수신, 처리하는 시스템을 개발했습니다. 기존 하드웨어 기반 시스템 대비 70% 이상의 비용 절감을 달성하면서도 안정적인 데이터 수신이 가능한 시스템을 구축했습니다.',
    technologies: ['Python', 'AWS', 'Docker', 'Kubernetes', 'TensorFlow', 'Redis', 'PostgreSQL'],
    category: 'research',
    status: 'completed',
    startDate: '2023-03',
    endDate: '2024-08',
    teamSize: 4,
    myRole: '시스템 설계 및 클라우드 아키텍처 구현',
    features: [
      '실시간 위성 데이터 수신 및 처리',
      '클라우드 기반 확장 가능한 아키텍처',
      '비용 효율적인 시스템 구조',
      '자동 스케일링 및 로드 밸런싱',
      '데이터 시각화 대시보드'
    ],
    challenges: [
      '대용량 위성 데이터의 실시간 처리 요구사항',
      '클라우드 비용 최적화와 성능 간의 균형',
      '위성 신호의 간헐적 특성으로 인한 데이터 손실'
    ],
    solutions: [
      '분산 처리 시스템을 구축하여 처리 능력 확장',
      '스케일링 정책 최적화로 비용 효율성 확보',
      '데이터 복구 알고리즘 구현으로 손실율 최소화'
    ],
    results: [
      '2024 KICS 학회 논문 발표',
      '기존 시스템 대비 70% 비용 절감 달성',
      '데이터 처리 속도 5배 향상',
      '시스템 가동률 99.5% 달성'
    ],
    images: ['/images/satellite-system.jpg']
  },
  {
    id: '3',
    title: '개인 포트폴리오 웹사이트',
    summary: 'React와 TypeScript로 구현한 반응형 포트폴리오 사이트',
    description: '현대적인 웹 기술을 활용하여 개인 포트폴리오를 제작했습니다. 반응형 디자인과 다양한 인터랙션을 구현하여 사용자 경험을 극대화했으며, 프로젝트 상세 페이지를 통해 체계적으로 작업물을 소개할 수 있도록 구성했습니다.',
    technologies: ['React', 'TypeScript', 'CSS', 'React Router', 'Vite'],
    category: 'web',
    status: 'in-progress',
    startDate: '2024-12',
    teamSize: 1,
    myRole: 'Full Stack Developer',
    features: [
      '반응형 웹 디자인',
      '부드러운 스크롤 애니메이션',
      '프로젝트 상세 페이지 라우팅',
      '환경변수를 통한 개인정보 보호',
      '스킬별 카테고리 분류 시스템'
    ],
    challenges: [
      'SEO 최적화를 위한 라우팅 구조 설계',
      '다양한 디바이스에서의 일관된 사용자 경험',
      '성능 최적화와 사용자 인터랙션의 균형'
    ],
    solutions: [
      'React Router를 활용한 SPA 라우팅 구현',
      'CSS Grid와 Flexbox를 활용한 반응형 레이아웃',
      '이미지 최적화 및 코드 스플리팅 적용'
    ],
    results: [
      '포트폴리오 사이트 성공적 배포',
      '모바일 호환성 100% 달성',
      'Lighthouse 성능 점수 90점 이상 확보',
      '사용자 친화적 UI/UX 구현'
    ],
    images: ['/images/portfolio.jpg'],
    demoUrl: '#',
    githubUrl: '#'
  }
];