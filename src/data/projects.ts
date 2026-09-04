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
    images: [],
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
    images: [],
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
      '사용자 친화적 UI/UX 구현을 목표'
    ],
    images: [],
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
    images: [],
    githubUrl: 'https://github.com/jsm150/OrangeMushroomStory',
    youtubeUrl: 'https://www.youtube.com/watch?v=ccmLCGhR81Q',
    namuWikiUrl: 'https://namu.wiki/w/%EC%A3%BC%ED%99%A9%EB%B2%84%EC%84%AF%EC%9D%98%20%EC%86%8C%EA%B0%9C%ED%8C%85',
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
    images: [],
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
    images: ['/images/nestquest/main.png','/images/nestquest/AI.gif','/images/nestquest/chating.gif','/images/nestquest/at.png'],
    imageDescriptions: [
      'Spring Boot와 Vue.js로 구현된 NestQuest 부동산 검색 플랫폼 메인 화면',
      'GPT-API를 활용한 AI 기반 추천 시스템 기능 시연 화면',
      'WebSocket을 이용한 실시간 채팅 기능 화면',
      'NestQuest의 아키텍쳐 구성도'],
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
      '실시간 이미지 및 비디오 처리 기능 구현 성공',
      '10개의 비전, 스피치 AI를 가져오고 테스트하여 다양한 AI의 중요한 경험이 됨',
      'gRPC를 통해 통신시간 400ms -> 100ms 로 단축',
      'Detic모델 학습을 통해 기존 Yolo 모델보다 15배(80 -> 1200) 더 다양한 객체를 찾는 모델을 갖춤',
      'WebAssembly과 Tensorflow.js를 이용하여, 가벼운 모델의 경우 최소 2배부터 10배까지 지연 속도 향상을 이룸'
    ],
    images: ['/images/yolo/yolo_face.png', '/images/yolo/yolo_clip.png', '/images/yolo/yolo_detic.jpg', '/images/yolo/yolo_detic_train.png','/images/yolo/yolo_first.png','/images/yolo/yolo_ingame.png'],
    imageDescriptions: [
      'Face it 이라는 게임에서 쓰이는 AI. DeepFace 모델을 사용하였으며, 정확한 측정을 위해 얼굴 인식 -> 배경을 지우고 -> 감정을 추출한다.',
      'Draw it 이라는 게임에서 쓰이는 AI. CLIP 모델을 사용하였으며, 사용자가 그린 그림을 분석하여 가장 유사한 그림을 찾아낸다.',
      'Bring it 이라는 게임에서 쓰일려고 학습한 AI. Detic 모델을 학습하였으며, 다양한 물체를 탐지할 수 있도록 하였다. 현재는 900개의 물체를 탐지할 수 있다. 아쉽게도 탐색 시간이 좀 걸려가지고.. 실시간 성이 떨어진다 판정하여 적용하지 못하였다.',
      'Detic 모델을 학습하는 과정. LVIS 데이터셋을 활용하여 900개의 물체를 탐지할 수 있도록 학습시켰다.',
      'Yolo Bring it 메인 페이지. React.js와 Three.js를 활용하여 3D로 구현하였다.',
      'Yolo Bring it 게임 플레이 화면. 다양한 AI 모델을 활용하여 최대 6인이 실시간으로 게임을 즐길 수 있다.'
    ],
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
    images: ['/images/awnas/search.png','/images/awnas/attack.png','/images/awnas/attack_after.png'],
    imageDescriptions: [
      'ESP-01S 모듈을 통해 와이파이에 침입한 모습',
      'Deauthentication 공격을 위해 네트워크 정보를 보는 모습',
      'Deauthentication 공격 후 연결이 끊긴 모습'
    ],
    githubUrl: 'https://github.com/JunYBae/Army_Wireless_Network_Attack_System',
    reflection: '이 프로젝트는 하드웨어와 소프트웨어를 모두 다뤄볼 수 있는 좋은 경험이었습니다. 팀원과 역할을 분담하여 제가 차량 시스템을, 팀원이 네트워크 공격 시스템을 담당했는데, 서로 다른 영역의 기술을 통합하는 과정에서 많은 것을 배웠습니다. 특히 제한된 하드웨어 자원에서 여러 기능을 구현하는 것이 쉽지 않았지만, 창의적인 해결책을 찾아가며 완성했을 때의 성취감이 컸습니다.'
  },
  {
    id: '9',
    title: '신한 해커톤 - BNPL을 이용한 대학생 공동구매 플랫폼',
    summary: '대학생을 위한 공동구매 플랫폼으로, BNPL(선구매 후결제) 시스템을 도입하여 경제적 부담 완화',
    description: '신한 해커톤 본선에 올라간 프로젝트. 돈이 없는 대학생들을 위해 이자가 없는 후불결제를 지원하는 공동구매 플랫폼. 학생 정보를 연계하여 BNPL한도를 정하며, 신한몰과의 제휴로 안전하고 신뢰성 있는 제품을 확보',
    technologies: ['React','TypeScript','Spring Boot','Redis','AWS','Docker','mySQL','github Action','Nginx','Gemini API', 'SSAFY 금융 API'],
    category: 'web',
    status: 'completed',
    startDate: '2025-08',
    endDate: '2025-08',
    teamSize: 4,
    myRole: ' AI Developer, Frontend Developer',
    features: [
      'BNPL(선구매 후결제) 시스템 도입',
      '대학생 신용 평가 시스템 구축',
      '신한몰과의 제휴를 통한 제품 확보',
      '사용자 친화적인 UI/UX 디자인',
      'Docker를 이용한 컨테이너화 및 배포',
      'GitHub Action을 통한 CI/CD 파이프라인 구축'
    ],
    challenges: [
      'BNPL 시스템의 신뢰성 확보',
      '대학생 신용 평가 모델 개발하기',
      '신한몰과의 원활한 제휴 및 제품 확보',
      '안정적인 서비스 운영을 위한 인프라 구축'
    ],
    solutions: [
      'SSAFY 금융 API를 활용한 공동구매 플랫폼 개발',
      'Gemini API를 이용한 신용 평가 모델 개발',
      'Spring Boot와 MySQL을 이용한 백엔드 시스템 구축',
      'AWS와 Docker를 활용한 안정적인 인프라 구축'
    ],
    results: [
      '신한 해커톤 본선 진출',
      'BNPL에 대한 이해 및 구현 경험',
      '대학생 신용 평가 모델 개발 경험'
    ],
    images: ['/images/sinhan/gonggu1.png','/images/sinhan/gonggu2.png','/images/sinhan/gonggu3.png','/images/sinhan/gonggu4.png','/images/sinhan/gonggu5.png','/images/sinhan/gonggu6.png'],
    imageDescriptions: ['공구 시작 컨테이너',
      '공구 완료 컨테이너',
      '결제 방법 선택 컨테이너',
      'BNPL결제 컨테이너',
      'AI를 이용한 한도 조회 컨테이너',
      'AI 세부 정보를 이용한 한도 조회 컨테이너'
    ],
    githubUrl: 'https://github.com/2025SinhanHackaton/GongGuYoung',
    documentation: '/images/sinhan/pt.pdf',
    reflection: '본선 진출 후 2주동안 온라인 개발 및 1박3일의 개발 일정으로 진행되었음. 금융 API를 활용하여 신용 평가 모델을 개발하는 것이 가장 큰 도전이었으며, 팀원들과의 협업을 통해 이를 성공적으로 구현할 수 있었습니다. 특히, BNPL 시스템을 도입함으로써 대학생들의 경제적 부담을 완화하는 데 기여할 수 있어 보람찼습니다. 해커톤이라는 짧은 시간 안에 아이디어를 구체화하고, 실제로 작동하는 프로토타입을 만드는 과정에서 많은 것을 배웠습니다.'
  },
{
    id: '10',
    title: 'Plate-Pay - 주차장과 결합한 새로운 페이먼트 시스템',
    summary: '자동차의 정보와 앱을 결합한 주차장 및 제휴매장 간편 결제 플랫폼',
    description: '싸피 - 핀테크 프로젝트. 자동차의 번호판 인식과 앱을 결합하여 주차장 및 제휴 매장에서 간편하게 결제할 수 있는 플랫폼을 개발했습니다. 사용자는 차량 정보와 연동된 앱을 통해 빠르고 안전한 결제 경험을 누릴 수 있습니다.',
    technologies: ['React native', 'SpringBoot','FastAPI' ,'EazyOCR','DeepFace','VGG-Face','YOLOv8n','Redis','Postgresql','Elastic Search','TypeScript','카카오 지도 API','Jsoup','Firebase','Nginx','Jenkins','STOMP', 'SSAFY 금융 API'],
    category: 'mobile',
    status: 'completed',
    startDate: '2025-09',
    endDate: '2025-09',
    teamSize: 6,
    myRole: ' AI Developer, Frontend Developer',
  features: [
    '차량 번호판 자동 인식 시스템',
    '실시간 결제 처리',
    '키오스크 인터페이스',
    '얼굴 인식 사용자 인증',
    '모바일 앱',
    '결제 내역 조회 및 관리'
  ],
  challenges: [
    '번호판 인식 정확도 향상',
    '실시간 결제 처리 시스템 구축',
    '다양한 주차장 및 제휴 매장과의 연동',
    '사용자 인증 및 보안 강화'
  ],
  solutions: [
    'YOLOv8n 모델을 활용한 번호판 인식 시스템 개발',
    'Spring Boot와 FastAPI를 이용한 백엔드 시스템 구축',
    'Redis와 PostgreSQL을 활용한 데이터 관리 및 캐싱',
    'Firebase를 이용한 모바일 앱 개발 및 푸시 알림 기능 구현'
  ],
  results: [
    '프로토타입 개발 완료',
    '번호판 인식 정확도 95% 달성',
    '실시간 결제 처리 시간 2초 이내'
  ],
    images: [],
    githubUrl: 'https://github.com/19GHYun/juchajang',
    reflection: '이 프로젝트는 싸피 핀테크 프로젝트입니다. AI 개발자로 참여하여 차량 번호판 인식 시스템 및 얼굴인식을 개발하였으며, 모바일 앱의 프론트엔드 개발에도 기여했습니다. 다양한 기술 스택을 활용하여 실시간 결제 처리 시스템을 구축하는 과정에서 많은 것을 배웠습니다. 특히, 사용자 인증 및 보안 강화에 중점을 두어 안전한 결제 환경을 제공하는 데 주력했습니다.'
  },
  {
    id: '11',
    title: '전술 상황인식 앱 플러그인 개발 - 무인기 탐지 정보 실시간 공유',
    summary: '안드로이드 상황인식 앱 플러그인과 임베디드 센서를 연동한 무인기 탐지 정보 공유 시스템',
    description: '지도 기반 전술 상황인식(SA) 애플리케이션의 플러그인을 개발하여, 현장의 임베디드 센서가 탐지한 무인기 정보를 실시간으로 지도 마커에 등록하고 같은 서버에 접속한 다른 단말들과 즉시 공유되도록 구현했습니다. 현장 조건에 따라 선택할 수 있도록 USB 시리얼 / BLE / Wi-Fi 세 가지 통신 경로를 각각 구현했습니다.',
    technologies: ['Java', 'Android', 'Plugin SDK', 'ESP32', 'ESP32-S3', 'Arduino / C++', 'USB Serial', 'BLE (GATT)', 'Wi-Fi UDP Multicast', 'XML 기반 상황정보 프로토콜', 'NMEA-like 프로토콜 설계', 'Docker', 'Android TTS', 'Git', 'Jira'],
    category: 'mobile',
    status: 'completed',
    startDate: '2025-12',
    endDate: '2026-02',
    teamSize: 1,
    myRole: '앱 플러그인 및 센서 펌웨어 개발',
    features: [
      '임베디드 센서와 안드로이드 단말 간 3종 통신 경로 구현 (USB 시리얼 / BLE / Wi-Fi)',
      'NMEA 형식을 참고한 경량 텍스트 프로토콜 설계 및 파서 구현',
      '탐지 정보의 실시간 지도 마커 등록 및 서버 전파',
      '다중 단말 간 마커 추가 및 삭제 양방향 동기화',
      '앱 재시작 시 서버 상태 기반 마커 복원',
      'JSON 파일 임포트를 통한 표적 정보 일괄 등록',
      '탐지 대상 방위각 표시 및 실시간 방향 변화 반영',
      'TTS 음성 경고 및 주야간 화면 모드',
      '앱에서 센서 방향으로 역방향 제어 명령 전송'
    ],
    challenges: [
      '단말과 센서를 잇는 물리 계층이 유선과 무선으로 계속 바뀌어 통신 코드를 매번 다시 써야 했던 문제',
      '마커 삭제 이벤트가 서버를 거쳐 자신에게 되돌아와 무한 루프를 만드는 루프백 현상',
      '다른 기종 단말을 재시작할 때 특정 마커 타입에서 발생하는 치명적 크래시',
      '앱을 껐다 켜면 서버에 남아 있는 마커가 플러그인 목록에 복원되지 않는 문제'
    ],
    solutions: [
      '통신 계층을 인터페이스로 분리하여 시리얼, BLE, Wi-Fi 구현체를 교체 가능한 구조로 재구성',
      '자신이 발신한 이벤트의 UID를 추적해 되돌아온 메시지를 걸러내는 방식으로 루프백 차단',
      '마커 타입 불일치로 인한 파싱 예외를 재현하고 타입 정의를 통일하여 크래시 제거',
      '플러그인 초기화 시점에 서버 상태를 조회해 내부 목록과 지도 마커를 재구성하는 동기화 루틴 추가'
    ],
    results: [
      'USB 시리얼, BLE, Wi-Fi 3개 통신 경로 모두 실장비 연동 성공',
      '서로 다른 기종의 단말 간 탐지 마커 실시간 동기화 및 재시작 후 상태 복원 동작 확인',
      '기존 오픈소스 서버를 공식 서버 스택(Docker)으로 이관하여 운영 환경 안정화',
      '9개 이상의 스프린트 이슈를 브랜치 단위로 분리해 개발 및 머지'
    ],
    images: [],
    reflection: '입사 후 처음으로 맡은 실무 프로젝트입니다. 기존 플러그인의 구조를 먼저 읽고 이해한 뒤 신규 플러그인을 파생시켜 개발했습니다. 통신 방식이 유선에서 BLE, 다시 Wi-Fi로 바뀌는 과정에서 매번 코드를 갈아엎다가, 결국 통신 계층을 분리해 두는 것이 답이라는 것을 몸으로 배웠습니다. 특히 여러 단말이 같은 서버를 보고 있을 때 생기는 루프백과 상태 불일치 문제를 잡으면서, 분산된 클라이언트 사이에서 무엇을 신뢰할 수 있는 상태로 볼 것인지 고민하는 경험을 했습니다.'
  },
  {
    id: '12',
    title: 'RF 신호 분석 도구 3종 개발 및 통합 애플리케이션 배포',
    summary: 'OFDM 부반송파 · QAM 차수 · 레이더 펄스 내 변조를 자동 분류하고 계측하는 분석 도구 3종',
    description: 'RF로 수집한 신호를 자동으로 분류하고 계측하는 분석 도구 3종(OFDM 부반송파 변조 분류기, QAM 차수 분석기, 레이더 펄스 내 변조 분석기)을 직접 설계하고 구현한 뒤, 하나의 통합 애플리케이션으로 묶어 단일 실행 파일로 배포했습니다. 수집한 파일을 분석하는 것에 그치지 않고 수신 장비에서 실시간으로 IQ를 받아 감시하다가 조건에 맞는 신호가 들어오면 자동으로 멈춰 정밀 분석하는 기능까지 포함합니다.',
    technologies: ['Python', 'PySide6', 'NumPy', 'SciPy', 'matplotlib', 'C#', '.NET 8', 'MATLAB', 'FlatBuffers', 'WebSocket', 'PyInstaller', 'DSP (STFT / CFAR / 고차 모멘트)', 'I/Q 신호 처리', 'Midas Blue (.cdif)'],
    category: 'desktop',
    status: 'in-progress',
    startDate: '2026-06',
    teamSize: 1,
    myRole: '신호처리 알고리즘 설계, 분석 도구 및 장비 연동 개발, 배포',
    features: [
      '[OFDM] STFT 기반 방출 구간 검출 및 OFDM 여부 판정',
      '[OFDM] 부반송파 단위 변조 분류(BPSK / QPSK / 8PSK / QAM)와 스펙트로그램 위 2계층 시각화',
      '[OFDM] 조밀한 바닥에서 부스트된 희소 반송파를 격리하는 floor / boost 자동 분리',
      '[OFDM] M2M4 기반 반송파별 SNR 추정 및 잡음 보정 PSK / QAM 판별',
      '[QAM] 단일 반송파 QAM 차수(8 / 16 / 32 / 64) 자동 식별',
      '[QAM] 심볼 타이밍 복원, DC 및 IQ 불균형 보정, 블록 단위 타이밍 추적',
      '[QAM] best-window 자동 선택, 신뢰도 캘리브레이션, 배치 리포트(PDF / CSV) 출력',
      '[IntraPulse] 펄스 검출(threshold / CFAR)에서 특징 추출, 변조 분류, 방출원 그룹핑까지의 분석 파이프라인',
      '[IntraPulse] CW / LFM(상승 · 하강) / 위상코드(Barker, Frank, P1~P4, M-seq) / FSK 주파수 도약 분류',
      '[IntraPulse] PDW 산출 (TOA, PW, PRI, SNR, 대역폭, 처프율, 시간대역폭곱)',
      '[IntraPulse] 수신 장비 실시간 IQ 수신 및 링 버퍼 기반 트리거 저장 (버튼을 누르기 이전 구간까지 저장)',
      '[IntraPulse] RD / AM / FM / PM 과 스펙트럼 4트랙 시간축 공유 뷰어, 확대 시 해당 구간만 원본 해상도로 재계산',
      '[IntraPulse] 자동 계측 (상승 및 하강 시간, 오버슈트, 리플, 드룹, 처프 선형성)와 A/B 마커 델타 측정',
      '[통합] 세 분석기를 단일 프로세스에 탭으로 임베드하고 PyInstaller 단일 exe로 배포',
    ],
    challenges: [
      '검출 결과가 에러 없이 조용히 0건이 되던 버그 - 수신기가 펄스 사이를 정확히 0으로 채우는 데이터에서 잡음 바닥 추정이 NaN이 되어 모든 비교가 False로 처리됨',
      '절대 모멘트 기반 변조 분류기가 위상 드리프트와 낮은 SNR에서 붕괴 (SNR 7 dB에서 QPSK 전량 오분류)',
      '고차 모멘트 기반 QAM 분류가 DC 오프셋, 위상 잡음, SRO 같은 실제 손상 조건에서 무너지는 문제',
      '수집 장비가 남기는 파일 포맷과 수신 장비 벤더 SDK의 API가 모두 문서화되어 있지 않았던 점',
      '3430 펄스 분석에 24.6초가 걸려 실시간 감시에 사용할 수 없던 성능 문제',
      '벤더 SDK의 인터페이스 방향을 오독하여 잘못된 경로로 접근했던 문제',
    ],
    solutions: [
      '펄스 레벨을 기준으로 한 2단계 문턱 방식으로 검출기를 재설계하여 NaN 전파를 차단',
      '분류기를 차분 모멘트 기반으로 전환 - 시험한 전 드리프트 구간에서 16/16 정확, SNR 7 dB까지 유지하고 그 아래에서는 틀린 라벨 대신 불명을 반환하도록 설계',
      'QAM 분류를 위상 불변 특징(링 카운트와 M42)으로 교체하고, 실장비가 사각형이 아닌 원형 8-QAM을 만든다는 점을 발견해 반영',
      '헤더 분석으로 수집 파일이 Midas Blue 계열임을 규명해 리더와 라이터를 직접 구현하고, DLL 메타데이터 분석으로 벤더 SDK API를 역공학',
      '위상코드 라이브러리 대조를 실제로 필요한 펄스에만 수행하도록 게이트하고 칩 평균과 반송파 탐색을 벡터화, 결과는 전수 비교로 동일함을 검증',
      '읽기 전용 권한으로 접속해 운용 세션과 충돌하지 않으면서 협대역 채널 IQ를 15.36 MS/s로 수신하도록 경로 전환',
    ],
    results: [
      '분석 도구 3종을 단일 실행 파일 하나로 통합하여 배포',
      '펄스 분석 성능 24.6초에서 4.3초로 단축 (3430펄스 기준), 실시간 근사 경로는 0.12초에서 0.03초',
      '수신 대역폭을 기존 경로 대비 76배(15.36 MS/s / 10 MHz)로 확대',
      '신호발생기에서 수신기, 분석기까지 전 체인 실측 검증 - PW 설정 100 µs 대비 측정 99.93 µs (오차 0.07%), PRI 설정 1000 µs 대비 측정 1000.000 µs',
      '문서화되지 않은 수집 파일 포맷과 벤더 SDK를 역공학으로 규명하여 재사용 가능한 형태로 정리',
      '통계적으로 분리가 불가능한 경우를 실측으로 확인하고 한계를 로그에 명시 - 추정으로 라벨을 만들지 않는 원칙 유지',
    ],
    images: [],
    reflection: '문서가 없는 장비와 포맷을 상대로, 어디에 무엇이 들어있는지를 실험으로 하나씩 좁혀 나간 프로젝트입니다. 가장 크게 배운 것은 알고리즘이 시뮬레이션에서 잘 도는 것과 실제 수집 신호에서 견디는 것은 전혀 다른 문제라는 점이었습니다. 절대 모멘트 기반 분류기가 위상 드리프트 한 줄에 무너지는 것을 보고 특징 자체를 위상에 불변하도록 다시 설계했고, 성능도 감으로 고치지 않고 프로파일링으로 병목을 특정한 뒤 전수 비교로 결과가 같음을 확인하고서야 반영했습니다. 분리할 수 없는 신호는 억지로 라벨을 붙이지 않고 불명으로 남기고 그 이유를 로그에 적어 두는 원칙을 지킨 것이, 도구를 실제로 신뢰하고 쓸 수 있게 만든 부분이라고 생각합니다.'
  },
  {
    id: '13',
    title: '동방마작전 (Touhou Mahjong War) - Warcraft III 커스텀 맵',
    summary: 'Warcraft III 위에서 동작하는 4인 온라인 리치 마작 게임 (개인 제작 중)',
    description: 'Warcraft III 커스텀 맵으로 제작 중인 4인 멀티플레이 리치 마작 게임입니다. 확장 JASS의 프레임 네이티브로 마작 전용 UI를 직접 구성하고, 마작패 텍스처를 제작해 3D 월드 위에 테이블을 렌더링합니다. 동방 Project 팬게임이며 작혼 스타일의 리치 마작 규칙을 따릅니다.',
    technologies: ['Warcraft III World Editor', '확장 JASS (JassNative)', 'Dz 프레임 네이티브', 'JN 네이티브', 'JNSendSyncData', '결정론적 Lockstep', 'Python (Pillow)', 'BLP 텍스처'],
    category: 'desktop',
    status: 'in-progress',
    startDate: '2026-08',
    teamSize: 1,
    myRole: '기획, 프로그래밍, 리소스 제작 (1인 개발)',
    features: [
      '4인 온라인 및 LAN 멀티플레이 리치 마작 (작혼 스타일 규칙)',
      '동방 Project 캐릭터 5인 선택 (하쿠레이 레이무 / 키리사메 마리사 / 이자요이 사쿠야 / 레밀리아 스칼렛 / 플랑드르 스칼렛)',
      'Dz 프레임 네이티브 기반 마작 전용 커스텀 UI',
      '마작패 34종과 회전본, 리치봉 등 커스텀 BLP 텍스처',
      '프레임 UI와 월드 이미지 타일을 결합한 3D 카메라 테이블 렌더링',
      'JNSendSyncData 기반 결정론적 lockstep 멀티 동기화'
    ],
    challenges: [
      'World Editor가 타일 기반 보드게임을 전제로 하지 않아 마작 UI를 프레임 네이티브로 처음부터 구성해야 하는 점',
      'Warcraft III 1.28 환경에서 4인 클라이언트의 게임 상태를 어긋남 없이 유지하는 문제',
      '마작패 34종과 회전본 등 다량의 텍스처 리소스를 수작업 없이 확보하는 문제'
    ],
    solutions: [
      'Dz 프레임 네이티브로 마작 전용 UI 레이어를 직접 구현하고 월드 이미지 타일과 결합하여 테이블을 구성',
      'JNSendSyncData를 이용한 결정론적 lockstep 구조로 4인 클라이언트 간 상태 동기화',
      'Python(Pillow)으로 패 이미지 생성과 가공을 자동화하여 BLP 텍스처를 일괄 제작'
    ],
    results: [
      '마작 전용 커스텀 UI 및 3D 테이블 렌더링 동작',
      '4인 멀티플레이 동기화 구조 구현',
      '현재 개발 진행 중 - JN 서버 연동을 통한 점수 및 랭킹 영속화 예정'
    ],
    images: [],
    reflection: '취미로 시작한 개인 프로젝트입니다. 게임 엔진이 전혀 상정하지 않은 장르를 억지로 올려 보는 작업이라, 기성 UI가 없어서 프레임 하나하나를 직접 그려야 했습니다. 업무에서 다루는 실시간 동기화 문제가 여기서도 똑같이 나온다는 점이 재미있었고, 결정론적 lockstep을 직접 구현해 보면서 네트워크 동기화를 보는 눈이 넓어졌습니다. 아직 개발 중이며 계속 다듬어 가고 있습니다.'
  }
];
