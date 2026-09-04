import React, { useMemo } from 'react';
import { Project } from '../types/Project';

/**
 * 프로젝트마다 결정적으로 생성되는 신호 파형 커버.
 *
 * 사진이 없는 프로젝트도 빈칸으로 보이지 않게 하려고 만들었다.
 * 같은 id 는 항상 같은 파형을 그리므로 새로고침해도 모양이 바뀌지 않고,
 * 카테고리마다 파형 종류를 달리해서 분야가 눈으로 구분된다.
 */

const W = 600;
const H = 120;

// mulberry32 - 시드 하나로 같은 난수열을 재현하기 위한 최소 구현
const makeRandom = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const seedOf = (value: string): number => {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const toPath = (points: number[][]): string =>
  points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ');

type Waveform = (rand: () => number) => string;

// 연구: 잡음이 섞인 정현파
const sine: Waveform = (rand) => {
  const freq = 2 + rand() * 2;
  const phase = rand() * Math.PI * 2;
  const pts: number[][] = [];
  for (let i = 0; i <= 120; i += 1) {
    const x = (i / 120) * W;
    const t = (i / 120) * Math.PI * 2 * freq + phase;
    const noise = (rand() - 0.5) * 7;
    pts.push([x, H / 2 + Math.sin(t) * 30 + noise]);
  }
  return toPath(pts);
};

// 하드웨어: 펄스열
const pulses: Waveform = (rand) => {
  const pts: number[][] = [[0, H - 22]];
  let x = 0;
  while (x < W) {
    const gap = 22 + rand() * 34;
    const width = 12 + rand() * 24;
    x += gap;
    pts.push([x, H - 22], [x, 26], [x + width, 26], [x + width, H - 22]);
    x += width;
  }
  pts.push([W, H - 22]);
  return toPath(pts);
};

// 모바일: 간헐적으로 터지는 버스트
const burst: Waveform = (rand) => {
  const pts: number[][] = [];
  for (let i = 0; i <= 200; i += 1) {
    const x = (i / 200) * W;
    const envelope = Math.exp(-Math.pow((i % 50) - 12, 2) / 90);
    const amp = envelope * (24 + rand() * 12);
    pts.push([x, H / 2 + (rand() - 0.5) * 2 * amp]);
  }
  return toPath(pts);
};

// 데스크톱: LFM 처프 (주파수가 점점 올라가는 스윕)
const chirp: Waveform = (rand) => {
  const dir = rand() > 0.5 ? 1 : -1;
  const pts: number[][] = [];
  for (let i = 0; i <= 300; i += 1) {
    const u = i / 300;
    const f = dir > 0 ? 1 + u * 9 : 10 - u * 9;
    const t = u * Math.PI * 2 * f * 2.4;
    pts.push([u * W, H / 2 + Math.sin(t) * 34]);
  }
  return toPath(pts);
};

// 웹: 아이 다이어그램처럼 겹치는 전이
const eye: Waveform = (rand) => {
  const segs: string[] = [];
  for (let s = 0; s < 7; s += 1) {
    const pts: number[][] = [];
    for (let i = 0; i <= 60; i += 1) {
      const u = i / 60;
      const x = u * W;
      const level = Math.sin(u * Math.PI * 2 * (1 + s * 0.15) + s) > 0 ? -1 : 1;
      const soft = Math.tanh(Math.sin(u * Math.PI * 2 * 4 + s * 0.9) * 2.2);
      pts.push([x, H / 2 + soft * level * 26 + (rand() - 0.5) * 3]);
    }
    segs.push(toPath(pts));
  }
  return segs.join(' ');
};

// AI: 성상도처럼 흩어졌다 모이는 궤적
const scatter: Waveform = (rand) => {
  const pts: number[][] = [];
  for (let i = 0; i <= 160; i += 1) {
    const u = i / 160;
    const cluster = Math.round(Math.sin(u * Math.PI * 6) * 1.6);
    pts.push([u * W, H / 2 + cluster * 18 + (rand() - 0.5) * 10]);
  }
  return toPath(pts);
};

// 기타: 랜덤 워크
const walk: Waveform = (rand) => {
  const pts: number[][] = [];
  let y = H / 2;
  for (let i = 0; i <= 140; i += 1) {
    y += (rand() - 0.5) * 12;
    y = Math.max(24, Math.min(H - 24, y));
    pts.push([(i / 140) * W, y]);
  }
  return toPath(pts);
};

const BY_CATEGORY: Record<Project['category'], Waveform> = {
  research: sine,
  hardware: pulses,
  mobile: burst,
  desktop: chirp,
  web: eye,
  ai: scatter,
  etc: walk,
};

interface ProjectCoverProps {
  project: Project;
  /** 카드 안에서 쓸 때는 작게, 상세 페이지에서는 크게 */
  height?: number;
}

const ProjectCover: React.FC<ProjectCoverProps> = ({ project, height = 96 }) => {
  const path = useMemo(() => {
    const rand = makeRandom(seedOf(project.id + project.title));
    return BY_CATEGORY[project.category](rand);
  }, [project.id, project.title, project.category]);

  const gradientId = `cover-fade-${project.id}`;

  return (
    <svg
      className="project-cover"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      style={{ height }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--phosphor)" stopOpacity="0.15" />
          <stop offset="45%" stopColor="var(--phosphor)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* 계측기 눈금 */}
      <g stroke="var(--line)" strokeWidth="1">
        {[0.25, 0.5, 0.75].map((p) => (
          <line key={p} x1={0} y1={H * p} x2={W} y2={H * p} />
        ))}
        {[0.2, 0.4, 0.6, 0.8].map((p) => (
          <line key={p} x1={W * p} y1={0} x2={W * p} y2={H} />
        ))}
      </g>

      <path
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ProjectCover;
