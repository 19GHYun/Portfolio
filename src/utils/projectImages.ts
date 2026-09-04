// projectImages.ts - 프로젝트 이미지 자동 수집
//
// src/assets/projects/<프로젝트 id>/ 폴더에 이미지를 넣어 두기만 하면
// 해당 프로젝트 상세 페이지에 자동으로 표시된다. projects.ts를 고칠 필요가 없다.
//
//   src/assets/projects/13/01-마작 테이블 렌더링.png
//     -> 13번 프로젝트의 첫 번째 이미지, 설명은 "마작 테이블 렌더링"
//
// 앞에 붙인 숫자는 표시 순서를 정하는 용도이며 설명에서는 제거된다.
// 숫자 없이 "펄스 분석 화면.png" 처럼 두어도 되고, 설명이 필요 없으면
// "screenshot1.png" 처럼 두면 파일명이 그대로 설명이 된다.

export interface ProjectImage {
  src: string;
  description: string;
}

const IMAGE_EXTENSION = /\.(png|jpe?g|gif|webp|svg)$/i;

// webpack require.context - 빌드 시점에 폴더를 훑어 이미지를 모두 번들에 포함시킨다
// @ts-ignore webpack이 주입하는 API라 @types/node의 require 타입에는 없다
const imageContext = require.context(
  '../assets/projects',
  true,
  /\.(png|jpe?g|gif|webp|svg)$/i
);

// './13/01-마작 테이블.png' -> '마작 테이블'
const toDescription = (filePath: string): string => {
  const fileName = filePath.split('/').pop() || filePath;
  return fileName
    .replace(IMAGE_EXTENSION, '')
    .replace(/^\d+\s*[-_.)]?\s*/, '') // 정렬용 숫자 접두사 제거
    .trim();
};

// asset 모듈은 { default: url } 형태로 오기도 하고 url 문자열로 오기도 한다
const toUrl = (moduleExport: any): string => {
  const url = String(
    moduleExport && moduleExport.default ? moduleExport.default : moduleExport
  );

  // 파일명이 그대로 URL이 되므로 % 와 # 는 escape 해 준다.
  // 예를 들어 '신뢰도 99%, EVM 2.3%.png' 의 '%,' 는 잘못된 퍼센트 인코딩이라
  // 그냥 두면 브라우저가 주소를 해석하지 못해 이미지가 깨진다.
  // (이미 %41 처럼 인코딩된 부분은 건드리지 않는다)
  return url.replace(/%(?![0-9A-Fa-f]{2})/g, '%25').replace(/#/g, '%23');
};

const imagesByProjectId: Record<string, ProjectImage[]> = {};

imageContext
  .keys()
  .sort()
  .forEach((key: string) => {
    // key 예시: './13/01-마작 테이블.png'
    const match = key.match(/^\.\/([^/]+)\/(.+)$/);
    if (!match) return;

    const [, projectId, filePath] = match;

    if (!imagesByProjectId[projectId]) {
      imagesByProjectId[projectId] = [];
    }

    imagesByProjectId[projectId].push({
      src: toUrl(imageContext(key)),
      description: toDescription(filePath),
    });
  });

export const getProjectImages = (projectId: string): ProjectImage[] =>
  imagesByProjectId[projectId] || [];
