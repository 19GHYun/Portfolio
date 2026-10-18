// skills.ts - 스킬 섹션 목록
//
// 스킬 섹션과 히어로의 SKILLS 숫자가 같은 목록을 보도록 한 곳에 둔다.

export interface SkillCategory {
  title: string;
  code: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: '언어',
    code: 'LANG',
    skills: ['Python', 'Java', 'C#', 'TypeScript', 'JavaScript', 'C++', 'JASS'],
  },
  {
    title: '신호 · 임베디드',
    code: 'RF / EMB',
    skills: [
      'ESP32',
      'Arduino',
      'Raspberry Pi',
      'RTL-SDR',
      'RF Communication',
      'NFC / RFID',
      'BLE',
      'USB Serial',
      'FlatBuffers',
    ],
  },
  {
    title: '프론트엔드',
    code: 'FRONT',
    skills: [
      'React',
      'Vue.js',
      'React Native',
      'Unity',
      'PySide6',
      'Tailwind CSS',
      'React Router',
    ],
  },
  {
    title: '백엔드 · 인프라',
    code: 'BACK',
    skills: [
      'Spring Boot',
      'FastAPI',
      'Node.js',
      'gRPC',
      'JPA / QueryDSL',
      'Spring Security',
      'WebSocket / STOMP',
      'Docker',
    ],
  },
  {
    title: 'AI · 데이터',
    code: 'AI / DATA',
    skills: [
      'TensorFlow',
      'PyTorch',
      'Computer Vision',
      'YOLOv8n',
      'NumPy / SciPy',
      'MySQL',
      'Elastic Search',
      'Cloudflare R2',
    ],
  },
];

export const SKILL_COUNT = SKILL_CATEGORIES.reduce((n, c) => n + c.skills.length, 0);
