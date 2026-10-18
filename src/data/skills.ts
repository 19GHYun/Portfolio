// skills.ts - 스킬 섹션 목록
//
// 스킬 섹션과 히어로의 SKILLS 숫자가 같은 목록을 보도록 한 곳에 둔다.
// match 는 projects.ts 의 technologies 표기와 맞춰 보는 규칙이다. 표기가 프로젝트마다
// 조금씩 달라서('SpringBoot', 'Spring Boot', 'mySQL') 정규식으로 묶는다.
// 맞는 프로젝트 수가 스킬 옆 막대가 되고, 누르면 그 프로젝트들만 목록에 남는다.

import { projects } from './projects';
import { Project } from '../types/Project';

export interface Skill {
  name: string;
  match?: RegExp;
}

export interface SkillCategory {
  title: string;
  code: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: '언어',
    code: 'LANG',
    skills: [
      { name: 'Python', match: /^python/i },
      { name: 'Java', match: /^java$/i },
      { name: 'C#', match: /^c#$|\.net/i },
      { name: 'TypeScript', match: /typescript/i },
      { name: 'JavaScript', match: /javascript|\.js\b/i },
      { name: 'C++', match: /c\+\+/i },
      { name: 'JASS', match: /jass/i },
    ],
  },
  {
    title: '신호 · 임베디드',
    code: 'RF / EMB',
    skills: [
      { name: 'ESP32', match: /^esp/i },
      { name: 'Arduino', match: /arduino/i },
      { name: 'Raspberry Pi', match: /raspberry/i },
      { name: 'RTL-SDR', match: /rtl-sdr/i },
      { name: 'RF Communication', match: /^rf\b|rf communication|i\/q|^dsp/i },
      { name: 'NFC / RFID', match: /nfc|rfid/i },
      { name: 'BLE', match: /^ble\b|bluetooth/i },
      { name: 'USB Serial', match: /usb serial/i },
      { name: 'FlatBuffers', match: /flatbuffers/i },
    ],
  },
  {
    title: '프론트엔드',
    code: 'FRONT',
    skills: [
      { name: 'React', match: /^react(\.js)?$/i },
      { name: 'Vue.js', match: /vue/i },
      { name: 'React Native', match: /react native/i },
      { name: 'Unity', match: /^unity$/i },
      { name: 'PySide6', match: /pyside/i },
      { name: 'Tailwind CSS', match: /tailwind/i },
      { name: 'React Router', match: /react router/i },
    ],
  },
  {
    title: '백엔드 · 인프라',
    code: 'BACK',
    skills: [
      { name: 'Spring Boot', match: /spring ?boot/i },
      { name: 'FastAPI', match: /fastapi/i },
      { name: 'Node.js', match: /node\.js/i },
      { name: 'gRPC', match: /grpc/i },
      { name: 'JPA / QueryDSL', match: /^jpa$|querydsl/i },
      { name: 'Spring Security', match: /spring security/i },
      { name: 'WebSocket / STOMP', match: /websocket|stomp/i },
      { name: 'Docker', match: /docker/i },
    ],
  },
  {
    title: 'AI · 데이터',
    code: 'AI / DATA',
    skills: [
      { name: 'TensorFlow', match: /tensorflow/i },
      { name: 'PyTorch', match: /pytorch/i },
      {
        name: 'Computer Vision',
        match: /yolo|detic|clip model|deepface|vgg-face|rembg|ocr|computer vision/i,
      },
      { name: 'YOLOv8n', match: /yolo/i },
      { name: 'NumPy / SciPy', match: /numpy|scipy/i },
      { name: 'MySQL', match: /mysql/i },
      { name: 'Elastic Search', match: /elastic/i },
      { name: 'Cloudflare R2', match: /cloudflare/i },
    ],
  },
];

export const SKILL_COUNT = SKILL_CATEGORIES.reduce((n, c) => n + c.skills.length, 0);

/** 그 스킬을 쓴 프로젝트들 */
export const projectsUsing = (skill: Skill): Project[] =>
  skill.match
    ? projects.filter((p) => p.technologies.some((t) => skill.match!.test(t)))
    : [];

export const findSkill = (name: string): Skill | undefined => {
  for (const cat of SKILL_CATEGORIES) {
    const hit = cat.skills.find((s) => s.name === name);
    if (hit) return hit;
  }
  return undefined;
};
