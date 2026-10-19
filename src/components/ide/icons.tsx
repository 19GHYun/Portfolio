import React from 'react';

/**
 * 작업 화면 아이콘. VS Code 의 codicon 처럼 가는 선으로 그린 단순한 모양이다.
 * 모두 currentColor 를 따르고, 장식용이라 스크린리더에서는 숨긴다.
 */

type IconProps = { size?: number; className?: string };

const Svg: React.FC<React.PropsWithChildren<IconProps>> = ({
  size = 16,
  className,
  children,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

export const IconFiles: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7z" />
    <path d="M14 3v4h4" />
    <path d="M9 21h8a2 2 0 0 0 2-2V9" opacity="0.55" />
  </Svg>
);

export const IconSearch: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="m15 15 5.5 5.5" />
  </Svg>
);

export const IconBranch: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <circle cx="6" cy="5" r="2" />
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="7" r="2" />
    <path d="M6 7v10" />
    <path d="M18 9c0 4-4 4-10 7" />
  </Svg>
);

export const IconExtensions: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="10.5" width="5" height="5" rx="0.5" />
    <rect x="8.5" y="10.5" width="5" height="5" rx="0.5" />
    <rect x="3.5" y="15.5" width="5" height="5" rx="0.5" />
    <rect x="14" y="4" width="5.5" height="5.5" rx="0.5" transform="rotate(12 16.75 6.75)" />
  </Svg>
);

export const IconRun: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M7 4.5v15l12-7.5z" />
  </Svg>
);

export const IconAccount: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8.5" r="4" />
    <path d="M4.5 20.5c1.2-4 4.2-6 7.5-6s6.3 2 7.5 6" />
  </Svg>
);

export const IconSun: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </Svg>
);

export const IconMoon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </Svg>
);

export const IconChevron: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="m9 6 6 6-6 6" />
  </Svg>
);

export const IconClose: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const IconMenu: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const IconGithub: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </Svg>
);

export const IconMail: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </Svg>
);

export const IconFolderOpen: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v1" />
    <path d="M3 7v11a1 1 0 0 0 1 1h14l3-8H7l-3 8" />
  </Svg>
);

export const IconCommand: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M7 9l3 3-3 3M12 15h5" />
    <rect x="3" y="4" width="18" height="16" rx="2" />
  </Svg>
);

export const IconArrowUp: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Svg>
);

export const IconBell: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
    <path d="M10 20.5a2 2 0 0 0 4 0" />
  </Svg>
);

export const IconCheck: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);

export const IconLink: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </Svg>
);
