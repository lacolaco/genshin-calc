export interface Character {
  displayName: string;
  thumbnailUrl: string;
}

export const characters = {
  albedo: {
    displayName: 'アルベド',
    thumbnailUrl: '/assets/images/characters/albedo.png',
  },
  fischl: {
    displayName: 'フィッシュル',
    thumbnailUrl: '/assets/images/characters/fischl.png',
  },
  ganyu: {
    displayName: '甘雨',
    thumbnailUrl: '/assets/images/characters/ganyu.png',
  },
  noelle: {
    displayName: 'ノエル',
    thumbnailUrl: '/assets/images/characters/noelle.png',
  },
  razor: {
    displayName: 'レザー',
    thumbnailUrl: '/assets/images/characters/razor.png',
  },
  xiao: {
    displayName: '魈',
    thumbnailUrl: '/assets/images/characters/xiao.png',
  },
  zhongli: {
    displayName: '鍾離',
    thumbnailUrl: '/assets/images/characters/zhongli.png',
  },
  xinyan: {
    displayName: '辛炎',
    thumbnailUrl: '/assets/images/characters/xinyan.png',
  },
} as const;

// type checking
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _: { [key: string]: Character } = characters;
