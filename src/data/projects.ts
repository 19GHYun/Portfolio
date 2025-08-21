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
    documentation: '/images/XR_논문.hwp',
    reflection: '제가 처음 연구실에 오고 진행 한 프로젝트입니다. 이미 진행 된 의학 실습 교육 플랫폼을 먼저 구조와 의도를 이해 한 다음 Photon서버를 연동했습니다. 당시에 AI를 활용하는 생각이 없던지라, 책으로 서버를 공부하면서 진행하였다. 지금 생각하면 시간에 비해 결과가 좀 아쉬웠지만, 그래도 연구실에서 첫 발자국을 성공적으로 내딛었다고 생각한다.'
  },
  {
    id: '2', 
    title: '저비용 위성 기지국 시스템 개발 및 이를 활용한 위성 데이터 처리',
    summary: '라즈베리파이를 활용한 위성 데이터 수신 및 처리 시스템',
    description: '라즈베리파이와 RTL-SDR 안테나를 이용하여 저비용 위성 기지국을 설계하고 위성 데이터를 실시간으로 수신, 처리하는 시스템을 개발했습니다. 스케줄링을 통해 위성사진을 받고, 이를 AI로 후처리 하여 서비스에 이용해보았다.',
    technologies: ['Python', 'AWS', 'TensorFlow', 'Python', 'Raspberry Pi', 'RTL-SDR', 'KakaoTalk BOT', 'RF'],
    category: 'research',
    status: 'completed',
    startDate: '2024-01',
    endDate: '2024-06',
    teamSize: 3,
    myRole: '시스템 설계 및 AI 후처리 개발',
    features: [
      '라즈베리파이 기반 위성 기지국 구축',
      'RTL-SDR 안테나를 이용한 위성 신호 수신',
      'AI 기반 이미지 후처리 및 분석',
      'KakaoTalk BOT과 GPT-API를 통한 날씨 서비스',
      'AWS를 이용한 데이터 저장 및 제공 서비스',
    ],
    challenges: [
      '위성 통신을 위한 저비용 하드웨어 설계',
      '위성 사진을 이용한 AI 모델 학습 및 최적화',
      '위성 사진을 이용한 서비스 구축'
    ],
    solutions: [
      'RTL-SDR 안테나와 라즈베리파이를 이용한 저비용 위성 신호 수신',
      'Noise-to-Noise 모델을 통한 위성 사진 후처리',
      'AWS S3를 통한 데이터 제공 서비스 및 KakaoTalk BOT을 통한 날씨 알람 서비스 제공',
    ],
    results: [
      '2024 KICS 학회 논문 발표',
      '위성 사진 10GB 이상 수신 및 처리',
      'KakaoTalk BOT을 통한 날씨 알람 서비스 성공적 운영',
      'AI 모델을 통한 위성 사진 후처리 성공',
    ],
    images: ['/images/satellite-system.jpg'],
    reflection: '이 프로젝트는 단순히 같이 있던 연구실 동료와 진행했던 프로젝트입니다. 연구실에 라즈베리파이가 남아 돌았고 + 막연하게 위성 통신을 해보고 싶다! 라는 생각으로 도전했습니다. 처음부터 라즈베리파이에 윈도우를 깔지, 라즈베리파이 OS를 깔지부터 많은 시행착오가 있었으며, 직접 안테나를 설치하고 위성 수신을 받았을때 쾌감을 느꼈습니다. 그 후 캡스톤 프로젝트까지 연결되어, 이 위성사진을 가지고 AI를 통한 후처리 및 서비스 제공까지 성공적으로 끝마치게 되어 보람을 느꼈습니다. 이 프로젝트를 통해 저비용으로도 위성 통신을 구현할 수 있다는 가능성을 확인할 수 있었습니다.'
  },
  {
    id: '3',
    title: '개인 포트폴리오 웹사이트',
    summary: 'React와 TypeScript로 구현한 반응형 포트폴리오 사이트',
    description: '현대적인 웹 기술을 활용하여 개인 포트폴리오를 제작했습니다. 반응형 디자인과 다양한 인터랙션을 구현하여 사용자 경험을 극대화했으며, 프로젝트 상세 페이지를 통해 체계적으로 작업물을 소개할 수 있도록 구성했습니다.',
    technologies: ['React', 'TypeScript', 'CSS', 'React Router', 'Vite'],
    category: 'web',
    status: 'in-progress',
    startDate: '2025-08',
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
      '포트폴리오 사이트 성공적 배포를 목표',
      '모바일 호환성 100% 달성을 목표',
      'Lighthouse 성능 점수 90점 이상 확보를 목표',
      '사용자 친화적 UI/UX 구현을 목표'
    ],
    images: ['/images/portfolio.jpg'],
    githubUrl: 'https://github.com/19GHYun/Portfolio',
    reflection: '포트폴리오를 만들면서 CI/CD까지 목표로 삼고 진행해보고 있습니다.'
  },
    {
    id: '4',
    title: '주황버섯 소개팅',
    summary: 'WarCraft3를 활용한 최대7인 협동 추리 탈출 게임. 원작자 - z1z1z1, 2차 개발자 - 2p4p, Junghun, OrangeMush',
    description: 'WarCraft3의 맵 에디터를 이용하여 최대 7인이 협동하여 추리하고 탈출하는 게임을 개발했습니다. 플레이어는 주황버섯이라는 캐릭터를 통해 다양한 스킬을 사용하며, 팀원들과 협력하여 문제를 해결하고 소개팅을 하러 가는 목표를 가지고 있습니다.',
    technologies: ['JASS', 'WarCraft3', 'Map Editor', 'blp', 'Trigger Editor', 'JN'],
    category: 'etc',
    status: 'completed',
    startDate: '2021-11',
    endDate: '2023-03',
    teamSize: 2,
    myRole: 'Full Stack Developer',
    features: [
      '최대 7인 협동 게임',
      '다양한 맵과 기믹',
      '추리 및 문제 해결 요소',
      '실시간 채팅 시스템',
      '게임 내 이벤트 및 보상 시스템'
    ],
    challenges: [
      '새로운 기믹을 쓰는 맵 개발',
      '다양한 플레이어 역할',
      '게임 밸런싱 및 테스트',
      '실시간 데이터 동기화'
    ],
    solutions: [
      '얼음 동굴, 아랫마을, 월드챌린지2 등 일부 맵 개발 참여',
      'Carrier, Support 등 다양한 역할 구현',
      '난이도 조절을 위한 게임 밸런싱',
      'JN Server를 통한 실시간 데이터 동기화'
    ],
    results: [
      'WarCraft3 커뮤니티에서 긍정적인 피드백',
      '최대 7인 협동 게임 성공적 구현',
      '다양한 맵과 기믹으로 플레이어의 흥미 유도',
      '클리어 시 재화 지급으로 반복 플레이 유도'
    ],
    images: ['/images/portfolio.jpg'],
    githubUrl: 'https://github.com/jsm150/OrangeMushroomStory',
    youtubeUrl: 'https://www.youtube.com/watch?v=ccmLCGhR81Q',
    reflection: '이 프로젝트는 제가 처음으로 참여하여 마음이 많이 갑니다. 개발하면서 마음에 맞는 친절한 사람들도 많이 만났고 고맙습니다. 사람이 좋아할만한 것을 만드는 것은 매우 어렵다고 느꼈습니다. 하나의 레벨을 만드는데 적게는 6달에서 1년까지 걸렸습니다. 쉽게 만들면 쉬워서 욕먹고, 어렵게 만들면 어렵다고 욕먹기 때문에.. 아무튼 이 경험으로 인해서 추후 학부 연구생까지 들어오게 되고.. 많은 도움을 받은 것 같습니다. 자연스럽게 학부 연구생 일을 시작하게 되면서, 은퇴하게 되었고, 추후 디버깅과 테스트를 하면서 도와준게 기억이 남습니다.'
  },
    {
    id: '5',
    title: 'NFC를 이용한 생체 센서 통신 앱 개발',
    summary: '카이스트와 협업 - 안드로이드 스튜디오와 Java를 이용한 NFC 기반 생체 센서 통신 앱',
    description: '카이스트와 협업하여 NFC를 이용한 생체 센서 통신 앱을 개발했습니다. 안드로이드 스튜디오와 Java를 사용하여 NFC 기능을 구현하고, 생체 센서 데이터를 실시간으로 수집 및 그래프로 시각화하는 시스템을 구축했습니다.',
    technologies: ['Android Studio', 'Java', 'NFC', 'GraphView'],
    category: 'mobile',
    status: 'completed',
    startDate: '2024-01',
    endDate: '2024-06',
    teamSize: 2,
    myRole: 'Main Developer',
    features: [
      'ISO 15693 NFC 통신 구현',
      '실시간 데이터 그래프 시각화',
      '로컬스토리지에 데이터 저장',
    ],
    challenges: [
      '처음 보는 장치와의 NFC 통신 구현',
      '생체 센서 데이터의 실시간 처리',
      '안드로이드 스튜디오와 Java에 대한 이해 및 개발'
    ],
    solutions: [
      'ISO 15693 NFC 프로토콜을 이용한 통신 구현',
      'GraphView 라이브러리를 활용한 데이터 시각화',
      '안드로이드 스튜디오와 Java를 열심히 공부 및 구조 파악'
    ],
    results: [
      'NFC 통신을 통한 생체 센서 데이터 수집 성공',
      '실시간 그래프 시각화 기능 구현',
      '로컬스토리지에 데이터 저장 및 확인 기능 구현',
      '카이스트와의 협업을 통한 프로젝트 성공적 완료 및 논문 저자 참여 예정'
    ],
    images: ['/images/portfolio.jpg'],
    githubUrl: 'https://github.com/19GHYun/snl_rf',
    reflection: '이 프로젝트의 첫걸음은 그리 좋지 않았습니다. 일명 짬 맞은 프로젝트였기 때문입니다. 다른 인원이 진행하다가 결국 성공시키지 못해서 넘어왔는데, 인수인계받으면서도 다양한 불화가 있었습니다. 하지만, 이 프로젝트를 통해 어떤 프로젝트든 시도하는 것이 두렵지 않다는 것을 배웠습니다. 뭐든지 열심히 하면 되더라구요..'
  },
    {
    id: '6',
    title: 'NestQuest - 부동산 실거래가 기반 주택 검색 플랫폼',
    summary: 'NestQuest는 부동산 실거래가 기반의 주택 검색 플랫폼으로, 사용자 친화적인 UI/UX와 강력한 검색 기능을 제공.',
    description: 'NestQuest는 부동산 실거래가 기반의 주택 검색 플랫폼으로, 사용자 친화적인 UI/UX와 강력한 검색 기능을 제공합니다. 사용자는 다양한 필터를 통해 원하는 주택을 쉽게 찾을 수 있으며, 데이터 업데이트를 통해 최신 정보를 제공합니다. 사용자끼리 실시간 채팅을 통해 정보를 교환할 수 있는 기능도 포함되어 있습니다.',
    technologies: ['Spring Boot', 'Vue.js', 'Node.js', 'WebSocket', 'MySQL', 'KakaoMap API','Gpt-API','Git','Spring security'],
    category: 'web',
    status: 'completed',
    startDate: '2025-06',
    endDate: '2025-07',
    teamSize: 2,
    myRole: 'Full Stack Developer',
    features: [
      '부동산 실거래가 기반의 주택 검색 기능',
      '사용자 친화적인 UI/UX',
      '다양한 필터링 옵션 제공',
      '1달 간격 데이터 업데이트 스케줄링',
      '사용자 간 실시간 채팅 기능',
      'KakaoMap API를 이용한 지도 서비스',
      'GPT-API를 활용한 AI 기반 추천 시스템',
      'Spring Security를 통한 인증 및 권한 관리',
      '커피숍, 음식점, 편의점 등 주변 상권 정보 제공'
    ],
    challenges: [
      '차별점을 위한 실시간 채팅 기능 구현',
      '부동산 데이터의 스케줄링을 통한 최신화',
      '주변 상권 정보 제공',
      'AI 기반 추천 시스템 제공'
    ],
    solutions: [
      'WebSocket을 이용한 실시간 채팅 기능 구현',
      'Spring Boot와 MySQL을 이용한 데이터베이스 설계 및 스케줄링',
      'KakaoMap API를 활용한 지도 서비스 통합',
      'GPT-API를 활용한 AI 기반 추천 시스템 개발'
    ],
    results: [
      'NestQuest 플랫폼 성공적 배포',
      '사용자 친화적인 UI/UX 구현',
      '실시간 채팅 기능을 통한 사용자 간 소통 활성화',
      '부동산 데이터의 최신화 및 정확성 확보',
      'AI 기반 추천 시스템을 통한 사용자 맞춤형 서비스 제공',
      '시연 中 참여를 통한 발표 제공'
    ],
    images: ['/images/portfolio.jpg'],
    githubUrl: 'https://github.com/19GHYun/NestQuest',
    reflection: 'SSAFY에 오고나서 제대로 배운 후 진행한 프로젝트였다. 로컬 까지만 배포된게 아쉬운 프로젝트. 동료를 아주 잘 만난 프로젝트였다. 내가 힘들땐 그만큼 동료가 채워주고, 동료가 힘들땐 내가 채워주는 그런 프로젝트였다. 서로의 부족한 부분을 채워주며, 협업의 중요성을 다시 한번 느낀 프로젝트였다. 또한, Spring Boot와 Vue.js를 활용한 풀스택 개발 경험을 쌓을 수 있었고, 실시간 채팅 기능과 AI 추천 시스템을 구현하면서 기술적인 도전도 많이 할 수 있었다. 이 프로젝트를 통해 팀워크와 커뮤니케이션의 중요성을 깊게 이해하게 되었다. 목표를 정하고 시간내에 완주하였다는 것에 성공한 프로젝트라고 생각한다.'
  },
    {
    id: '7',
    title: 'Yolo Bring it - WebRTC와 AI를 이용한 실시간 게임 웹 애플리케이션',
    summary: 'WebRTC와 AI를 활용한 실시간 게임 웹 애플리케이션 개발',
    description: 'WebRTC와 AI를 활용하여 실시간으로 게임을 즐길 수 있는 웹 애플리케이션을 개발했습니다. AI 기술을 통해 사용자 경험을 향상시키고, 실시간으로 반응하는 게임 환경을 구현했습니다.',
    technologies: ['CLIP model','YOLO model','Rembg model','DeepFace model', 'Whisper model', 'librosa model', 'difflib model', 'Detic model', 'tensorflow.js', 'WebAssembly', 'react.js', 'TypeScript', 'Three.js', 'Blender','Tailwind CSS', 'Java','Python','Spring Boot', 'JPA', 'QueryDSL', 'STOMP WebSocket', 'Spring Cloud', 'Spring Security', 'gRPC Server', 'Thymeleaf', 'Postgresql', 'Redis', 'LiveKit', 'AWS', 'Docker', 'Zipkin', 'Kafka', 'RabbitMQ', 'Cloudflare R2', 'Nginx', 'GitLab', 'Notion', 'Figma', 'Jira', 'Swagger'],
    category: 'web',
    status: 'completed',
    startDate: '2025-07',
    endDate: '2025-08',
    teamSize: 6,
    myRole: 'AI Developer',
    features: [
      '실시간 게임 플레이',
      'AI 기반 사용자 경험 향상',
      'WebRTC를 이용한 실시간 통신',
      '다양한 AI 모델을 활용한 기능 구현',
      '사용자 친화적인 UI/UX 디자인',
      '실시간 음성 인식 및 텍스트 변환 기능',
      '실시간 이미지 및 비디오 처리 기능',
      'msa 기반의 확장 가능한 아키텍처',
      'gRPC를 이용한 서비스 간 통신',
      'Docker를 이용한 컨테이너화 및 배포',
    ],
    challenges: [
      '다양한 객체 탐지할 수 있는 모델 개발',
      '통신시간 최적화',
      'AI 지연시간 최적화'
    ],
    solutions: [
      'Detic 모델을 이용한 객체 탐지 기능 구현',
      'gRPC를 이용한 서비스 간 통신 최적화',
      'WebAssembly, Tensorflow.js를 이용한 AI 모델 최적화'
    ],
    results: [
      '실시간 게임 웹 애플리케이션 성공적 배포',
      'AI 기반 사용자 경험 향상',
      'WebRTC를 이용한 실시간 통신 구현',
      '다양한 AI 모델을 활용한 기능 구현 성공',
      '사용자 친화적인 UI/UX 디자인 적용',
      '실시간 음성 인식 및 텍스트 변환 기능 구현 성공',
      '실시간 이미지 및 비디오 처리 기능 구현 성공'
    ],
    images: ['/images/portfolio.jpg'],
    githubUrl: '#',
    reflection: '6명에서 진행한 대규모 프로젝트였다. AI 개발자로 참여하여 2주안에 실현가능성 및 테스트를 완료했고, 3주동안 모델을 학습시켰다. 그러면서 짬짬히 작은일 처리했지만.. 아무튼 다양한 AI 모델을 테스트하고 실현가능성을 검사 하였으나, 이게 게임에 다 안들어간게 많이 아쉬울 따름이다.. 그래도 6명에서 한 대규모 프로젝트 참 어려웠지만 좋았다.'
  },
      {
    id: '8',
    title: 'AWNAS - Army Wireless Network Attack System',
    summary: '아두이노 기반 무인 지상 차량(UGV)과 네트워크 공격 시스템을 통합한 전술 시스템',
    description: '현대 전술 환경에서 네트워크 및 전자전 대응을 위한 무인 지상 차량(UGV) 시스템을 개발했습니다. 차량 원격 조종 시스템과 WiFi Deauthentication 공격 기능을 통합하여 실전 상황에서 활용 가능한 다목적 전술 장비를 구현했습니다.',
    technologies: ['Arduino', 'ESP-01S', 'C++', 'Bluetooth', 'WiFi', 'DC Motor', 'LCD', 'RF Communication'],
    category: 'hardware',
    status: 'completed',
    startDate: '2023-03',
    endDate: '2023-06',
    teamSize: 2,
    myRole: '차량 시스템 개발 및 하드웨어 통합',
    features: [
      '스마트폰 앱을 통한 원격 차량 조종',
      'DC 모터 기반 전후좌우 이동 제어',
      'LED를 통한 차량 상태 표시',
      'LCD 디스플레이로 현재 상태 확인',
      'WiFi Deauthentication 공격 수행',
      '웹 인터페이스를 통한 공격 대상 선택',
      '3분 자폭 타이머 시스템',
      '공격 및 자폭 시 사운드 알림'
    ],
    challenges: [
      '차량 제어와 네트워크 공격 시스템의 독립적 운용',
      '블루투스와 WiFi 통신의 동시 구현',
      '제한된 하드웨어 자원에서의 멀티태스킹',
      '실시간 제어 시스템의 안정성 확보'
    ],
    solutions: [
      '2층 아두이노 구조로 차량 제어와 네트워크 공격 기능 분리',
      'ESP-01S 모듈을 활용한 WiFi 기능 구현',
      '블루투스 모듈을 통한 안정적인 원격 제어',
      'LCD와 LED를 통한 시각적 피드백 시스템 구축'
    ],
    results: [
      '무인 지상 차량 원격 조종 시스템 성공적 구현',
      'WiFi Deauthentication 공격 기능 구현',
      '스마트폰 앱과 웹 인터페이스를 통한 통합 제어 시스템',
      '실시간 상태 모니터링 및 피드백 시스템 완성'
    ],
    images: ['/images/portfolio.jpg'],
    githubUrl: 'https://github.com/JunYBae/Army_Wireless_Network_Attack_System',
    reflection: '이 프로젝트는 하드웨어와 소프트웨어를 모두 다뤄볼 수 있는 좋은 경험이었습니다. 팀원과 역할을 분담하여 제가 차량 시스템을, 팀원이 네트워크 공격 시스템을 담당했는데, 서로 다른 영역의 기술을 통합하는 과정에서 많은 것을 배웠습니다. 특히 제한된 하드웨어 자원에서 여러 기능을 구현하는 것이 쉽지 않았지만, 창의적인 해결책을 찾아가며 완성했을 때의 성취감이 컸습니다.'
  }
];