import React, { useCallback, useEffect, useRef, useState } from 'react';
import './SpectrumScope.css';

/**
 * 히어로의 스펙트럼 분석기 화면.
 *
 * 위는 지금 순간의 스펙트럼 트레이스, 아래는 시간이 아래로 흘러가는 워터폴이다.
 * 실제 측정값이 아니라 작업에서 자주 보는 신호 몇 개를 흉내 낸 시뮬레이션이다.
 *   - OFDM: 넓고 평평한 블록, TDD 처럼 켜졌다 꺼짐
 *   - 8-QAM: 좁은 단일 반송파
 *   - LFM: 주파수가 비스듬히 쓸고 지나가는 레이더 펄스 (워터폴에 사선으로 남음)
 *   - HOP: 몇 프레임마다 자리를 옮기는 도약 신호
 *
 * 화면 밖이거나 탭이 숨겨지면 멈추고, 움직임 줄이기 설정이면 한 장만 그려 둔다.
 * 마우스를 올리면 그 자리의 주파수 · 세기 · 시간을 마커로 읽어 준다.
 */

const BINS = 256;
const ROWS = 120;
const CF_GHZ = 2.437;
const SPAN_MHZ = 40;
const STEP_MS = 34; // 시뮬레이션 한 줄 간격 (약 30줄/초)
const DB_MIN = -100;
const DB_MAX = -40;

// 화면에 붙일 신호 이름표 (bin 위치, 대략적인 꼭대기 세기)
const LABELS = [
  { name: 'OFDM', bin: 63, db: -60 },
  { name: '8-QAM', bin: 132, db: -52 },
  { name: 'LFM', bin: 205, db: -57 },
];

interface SimState {
  t: number;
  hopBin: number;
}

// 대략 가우시안인 잡음 (균등 난수 세 개의 합)
const noise = () => (Math.random() + Math.random() + Math.random() - 1.5) * 2.4;

const simulate = (sim: SimState, out: Float32Array) => {
  sim.t += 1;
  const t = sim.t;

  for (let i = 0; i < BINS; i += 1) out[i] = -95 + noise();

  // OFDM 블록: 가장자리는 부드럽게, 윗면은 잔물결
  if (t % 96 < 66) {
    for (let i = 26; i < 102; i += 1) {
      const edge = Math.min(i - 26, 101 - i);
      const skirt = edge < 6 ? (6 - edge) * 5.5 : 0;
      const top = -61 + Math.sin(i * 1.9 + t * 0.21) * 1.1 + noise() * 0.6 - skirt;
      if (top > out[i]) out[i] = top;
    }
  }

  // 8-QAM 단일 반송파
  for (let i = 120; i < 145; i += 1) {
    const d = (i - 132) / 4.2;
    const v = -52 - d * d * 7 + noise() * 0.5;
    if (v > out[i]) out[i] = v;
  }

  // 도약 신호: 30줄마다 자리를 옮기고, 그중 20줄만 켜짐
  if (t % 30 === 0) sim.hopBin = 150 + Math.floor(Math.random() * 96);
  if (t % 30 < 20) {
    for (let i = sim.hopBin - 2; i <= sim.hopBin + 2; i += 1) {
      if (i < 0 || i >= BINS) continue;
      const v = -68 - Math.abs(i - sim.hopBin) * 4 + noise() * 0.6;
      if (v > out[i]) out[i] = v;
    }
  }

  // LFM 펄스: 75줄마다 16줄 동안 160 → 250 bin 으로 쓸어 올라감
  const k = t % 75;
  if (k < 16) {
    const centre = 160 + (k / 15) * 90;
    for (let i = Math.floor(centre) - 5; i <= Math.ceil(centre) + 5; i += 1) {
      if (i < 0 || i >= BINS) continue;
      const d = (i - centre) / 2.2;
      const v = -56 - d * d * 4 + noise() * 0.5;
      if (v > out[i]) out[i] = v;
    }
  }
};

// dB -> 색 (검정 -> 짙은 녹색 -> 인광 녹색 -> 청록 -> 거의 흰색)
const STOPS: [number, [number, number, number]][] = [
  [0, [4, 7, 8]],
  [0.22, [6, 30, 20]],
  [0.45, [22, 96, 58]],
  [0.66, [74, 222, 128]],
  [0.84, [34, 211, 238]],
  [1, [225, 255, 246]],
];

const LUT = (() => {
  const lut = new Uint8ClampedArray(256 * 3);
  for (let n = 0; n < 256; n += 1) {
    const v = n / 255;
    let j = 0;
    while (j < STOPS.length - 2 && v > STOPS[j + 1][0]) j += 1;
    const [a, ca] = STOPS[j];
    const [b, cb] = STOPS[j + 1];
    const f = Math.min(1, Math.max(0, (v - a) / (b - a)));
    for (let c = 0; c < 3; c += 1) lut[n * 3 + c] = ca[c] + (cb[c] - ca[c]) * f;
  }
  return lut;
})();

const levelToByte = (db: number) =>
  Math.max(0, Math.min(255, Math.round(((db - (DB_MIN + 4)) / (DB_MAX + 2 - DB_MIN)) * 255)));

const dbToY = (db: number, h: number) =>
  h - ((Math.max(DB_MIN, Math.min(DB_MAX, db)) - DB_MIN) / (DB_MAX - DB_MIN)) * h;

interface Marker {
  x: number; // 0..1
  y: number; // 0..1 (워터폴 기준)
  inWaterfall: boolean;
  freq: string;
  level: string;
  ago: string;
}

interface SpectrumScopeProps {
  readouts: { key: string; value: string }[];
  /** 신호 이름표를 누르면 (그 신호를 다루는 프로젝트로) */
  onTag?: () => void;
  tagTitle?: string;
}

const SpectrumScope: React.FC<SpectrumScopeProps> = ({ readouts, onTag, tagTitle }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const traceRef = useRef<HTMLCanvasElement>(null);
  const fallRef = useRef<HTMLCanvasElement>(null);

  // 워터폴 한 줄씩의 dB 값 (마커 판독용 고리 버퍼)
  const ring = useRef(new Float32Array(ROWS * BINS));
  const head = useRef(0);
  const current = useRef(new Float32Array(BINS));
  const peak = useRef(new Float32Array(BINS).fill(DB_MIN));
  const sim = useRef<SimState>({ t: 0, hopBin: 200 });
  const [marker, setMarker] = useState<Marker | null>(null);
  const markerFrame = useRef(0);

  // 한 줄 진행: 시뮬레이션 -> 고리 버퍼 -> 워터폴 맨 위 줄
  const step = useCallback((paint: boolean) => {
    const out = current.current;
    simulate(sim.current, out);

    head.current = (head.current + 1) % ROWS;
    ring.current.set(out, head.current * BINS);

    const pk = peak.current;
    for (let i = 0; i < BINS; i += 1) pk[i] = Math.max(out[i], pk[i] - 0.6);

    if (!paint) return;
    const fall = fallRef.current;
    const ctx = fall?.getContext('2d');
    if (!fall || !ctx) return;
    ctx.drawImage(fall, 0, 0, BINS, ROWS - 1, 0, 1, BINS, ROWS - 1);
    const row = ctx.createImageData(BINS, 1);
    for (let i = 0; i < BINS; i += 1) {
      const n = levelToByte(out[i]);
      row.data[i * 4] = LUT[n * 3];
      row.data[i * 4 + 1] = LUT[n * 3 + 1];
      row.data[i * 4 + 2] = LUT[n * 3 + 2];
      row.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(row, 0, 0);
  }, []);

  // 위쪽 스펙트럼 트레이스
  const drawTrace = useCallback(() => {
    const canvas = traceRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, w, h);

    // 눈금
    ctx.strokeStyle = 'rgba(74, 222, 128, 0.10)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let g = 1; g < 6; g += 1) {
      const y = Math.round((h * g) / 6) + 0.5;
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    for (let g = 1; g < 8; g += 1) {
      const x = Math.round((w * g) / 8) + 0.5;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    ctx.stroke();

    const xs = (i: number) => (i / (BINS - 1)) * w;

    // 피크 홀드
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.28)';
    ctx.lineWidth = 1 * dpr;
    ctx.beginPath();
    peak.current.forEach((db, i) => {
      const y = dbToY(db, h);
      if (i === 0) ctx.moveTo(xs(i), y);
      else ctx.lineTo(xs(i), y);
    });
    ctx.stroke();

    // 현재 트레이스 + 아래 채움
    const out = current.current;
    ctx.beginPath();
    out.forEach((db, i) => {
      const y = dbToY(db, h);
      if (i === 0) ctx.moveTo(xs(i), y);
      else ctx.lineTo(xs(i), y);
    });
    const fill = ctx.createLinearGradient(0, 0, 0, h);
    fill.addColorStop(0, 'rgba(74, 222, 128, 0.22)');
    fill.addColorStop(1, 'rgba(74, 222, 128, 0)');
    ctx.save();
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    out.forEach((db, i) => {
      const y = dbToY(db, h);
      if (i === 0) ctx.moveTo(xs(i), y);
      else ctx.lineTo(xs(i), y);
    });
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 1.3 * dpr;
    ctx.shadowColor = 'rgba(74, 222, 128, 0.7)';
    ctx.shadowBlur = 6 * dpr;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }, []);

  // 캔버스 크기 맞추기 (트레이스만 화면 해상도, 워터폴은 고정 해상도를 늘려 씀)
  useEffect(() => {
    const canvas = traceRef.current;
    if (!canvas) return;
    const fit = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      drawTrace();
    };
    fit();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null;
    ro?.observe(canvas);
    return () => ro?.disconnect();
  }, [drawTrace]);

  // 시작할 때 워터폴을 미리 채워 빈 화면으로 시작하지 않게 한다
  useEffect(() => {
    for (let r = 0; r < ROWS; r += 1) step(true);
    drawTrace();
  }, [step, drawTrace]);

  // 애니메이션 루프
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let raf = 0;
    let last = 0;
    let visible = true;

    const loop = (now: number) => {
      raf = window.requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      if (now - last < STEP_MS) return;
      last = now;
      step(true);
      drawTrace();
    };
    raf = window.requestAnimationFrame(loop);

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
          })
        : null;
    if (rootRef.current) io?.observe(rootRef.current);

    return () => {
      window.cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [step, drawTrace]);

  // 마커: 마우스 자리의 주파수 / 세기 / 몇 초 전
  const readAt = (clientX: number, clientY: number, target: HTMLElement, inWaterfall: boolean) => {
    const rect = target.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    const bin = Math.min(BINS - 1, Math.round(x * (BINS - 1)));
    const rowsAgo = inWaterfall ? Math.min(ROWS - 1, Math.round(y * (ROWS - 1))) : 0;
    const idx = ((head.current - rowsAgo + ROWS) % ROWS) * BINS + bin;
    const db = ring.current[idx];
    const freq = CF_GHZ - SPAN_MHZ / 2000 + (bin / (BINS - 1)) * (SPAN_MHZ / 1000);
    return {
      x,
      y,
      inWaterfall,
      freq: `${freq.toFixed(4)} GHz`,
      level: `${db.toFixed(1)} dBm`,
      ago: inWaterfall ? `-${((rowsAgo * STEP_MS) / 1000).toFixed(2)} s` : 'NOW',
    };
  };

  const onMove = (inWaterfall: boolean) => (e: React.PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    if (markerFrame.current) return;
    markerFrame.current = window.requestAnimationFrame(() => {
      markerFrame.current = 0;
      setMarker(readAt(clientX, clientY, currentTarget, inWaterfall));
    });
  };

  const onLeave = () => setMarker(null);

  const freqTicks = [-20, -10, 0, 10, 20];

  return (
    <div ref={rootRef} className="scope panel" aria-label="스펙트럼 분석기 모양의 장식 화면과 요약 지표">
      <div className="scope-bar">
        <span className="scope-live">
          <span className="led active" aria-hidden="true" />
          RX · CH.01
        </span>
        <span className="scope-param">
          CF <b>{CF_GHZ.toFixed(3)} GHz</b>
        </span>
        <span className="scope-param scope-param-span">
          SPAN <b>{SPAN_MHZ} MHz</b>
        </span>
        <span className="scope-param scope-param-hide">
          RBW <b>30 kHz</b>
        </span>
        <span className="scope-sim">SIMULATED</span>
      </div>

      <div className="scope-screen">
        <div className="scope-trace" onPointerMove={onMove(false)} onPointerLeave={onLeave}>
          <canvas ref={traceRef} aria-hidden="true" />
          {LABELS.map((l) => (
            <button
              key={l.name}
              type="button"
              className="scope-tag"
              style={{
                left: `${(l.bin / (BINS - 1)) * 100}%`,
                top: `${((DB_MAX - l.db) / (DB_MAX - DB_MIN)) * 100}%`,
              }}
              onClick={onTag}
              disabled={!onTag}
              title={tagTitle}
              aria-label={tagTitle ? `${l.name} - ${tagTitle}` : l.name}
            >
              {l.name}
            </button>
          ))}
          <span className="scope-axis-db" aria-hidden="true">-40 dBm</span>
        </div>

        <div className="scope-fall" onPointerMove={onMove(true)} onPointerLeave={onLeave} aria-hidden="true">
          <canvas ref={fallRef} width={BINS} height={ROWS} />
        </div>

        <div className="scope-freq" aria-hidden="true">
          {freqTicks.map((f) => (
            <span key={f}>{f === 0 ? `${CF_GHZ.toFixed(3)}G` : `${f > 0 ? '+' : ''}${f}M`}</span>
          ))}
        </div>

        {marker && (
          <span aria-hidden="true">
            {/* 화면 좌우 안쪽 여백(1rem)을 빼고 트레이스 폭 기준으로 놓는다 */}
            <span
              className="scope-cursor"
              style={{ left: `calc(1rem + ${marker.x} * (100% - 2rem))` }}
            />
            <span
              className={`scope-readout ${marker.x > 0.6 ? 'is-left' : ''}`}
              style={{ left: `calc(1rem + ${marker.x} * (100% - 2rem))` }}
            >
              <b>MKR 1</b>
              <span>{marker.freq}</span>
              <span>{marker.level}</span>
              <span>{marker.ago}</span>
            </span>
          </span>
        )}
      </div>

      <dl className="scope-readouts">
        {readouts.map((item) => (
          <div key={item.key} className="scope-readout-cell">
            <dt className="mono-label">{item.key}</dt>
            <dd className="readout">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default SpectrumScope;
