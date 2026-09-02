// Site-wide configuration ported from the old Jekyll _config.yml / _data.

export const SITE = {
  title: 'Eyeregulus',
  titleSeparator: '-',
  name: 'eyeregulus',
  description:
    '현대점성학과 수비학으로 나를 이해하는 이야기. 보이드 오브 코스, 네이탈 차트, 수비학 계산 앱도 함께.',
  url: 'https://eyeregulus.dev',
  locale: 'ko-KR',
  ogLocale: 'ko_KR',
  wordsPerMinute: 200,
  defaultOgImage: '/assets/images/og-default.png',
  googleSiteVerification: 'ckejiakpT65_svdpAjoaXIyEPq3GH89EL-gHGyA_7Cs',
  naverSiteVerification: '369f9859a7dfaec2fd25f8dcf60bc190ce334441',
  gtmId: 'GTM-PTHH9S4T',
  gtagId: 'GTM-PWXGJ4JB',
};

export const AUTHOR = {
  name: 'eyeregulus',
  bio: '**Fathoming the world with the eyes of a lion**',
  location: 'Elsewhere',
  email: 'eyeregulus@gmail.com',
};

// The person behind the brand — powers schema.org Person + the /links/ hub page
// so Google/AI resolve "아이레굴루스" to one entity across YouTube, blog and apps.
export const PROFILE = {
  displayName: 'Eye of regulus',
  alternateNames: ['아이레굴루스', 'Eyeregulus', 'Eye of regulus Astrology'],
  avatar: '/assets/images/Category/Lion_1.png',
  tagline: '사자의 눈으로 세상을 헤아립니다',
  taglineEn: 'Fathoming the world with the eyes of a lion',
  summary:
    '현대점성학과 수비학으로 나를 이해하는 이야기를 글과 영상으로 나눕니다. 보이드 오브 코스, 네이탈 차트, 수비학 계산 앱을 직접 만들어 배포하는 1인 창작자·개발자.',
  knowsAbout: [
    '현대점성학',
    '수비학',
    '보이드 오브 코스',
    '네이탈 차트',
    'Astrology',
    'Numerology',
  ],
};

export const TAGLINE = '사자의 눈으로 세상을 헤아립니다';
export const INTRO = '현대점성학과 수비학으로 나를 이해하는 이야기.';

export const YOUTUBE_URL = 'https://www.youtube.com/@Eyeofregulus_Astrology';
// Canonical (never-changing) channel URL — safe anchor for schema sameAs.
export const YOUTUBE_CHANNEL_URL =
  'https://www.youtube.com/channel/UChCty12a9rmWtbVavF7H9JQ';
export const X_URL = 'https://x.com/eye_of_regulus';

// Every canonical profile for this brand — used for schema.org `sameAs`
// so Google/AI link the blog, channel, socials and apps as one entity.
export const SAME_AS = [
  YOUTUBE_URL,
  YOUTUBE_CHANNEL_URL,
  X_URL,
  'https://play.google.com/store/apps/details?id=dev.regulus.chart',
  'https://play.google.com/store/apps/details?id=dev.lioluna.voidofcourse',
  'https://apps.apple.com/kr/app/void-of-course/id6777887938',
  'https://play.google.com/store/apps/details?id=com.numerology.finderapp',
];

// GoatCounter site code -> https://<code>.goatcounter.com
export const GOATCOUNTER_CODE = 'eyeregulusdev';

// Masthead navigation (_data/navigation.yml -> main)
export const MAIN_NAV = [
  { title: 'About', url: '/about/' },
  { title: 'Apps', url: '/apps/' },
  { title: 'Review', url: '/review/' },
  { title: 'YouTube', url: YOUTUBE_URL, external: true },
];

// Apps featured on the home page. Icons live in public/assets/images/apps/.
export const APPS = [
  {
    name: 'Regulus Chart',
    icon: '/assets/images/apps/regulus-chart.png',
    desc: '내담자의 네이탈·트랜짓 차트를 오프라인에서 그려주는 상담용 도구.',
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=dev.regulus.chart' },
      { label: '사용법', url: '/어플리케이션 사용방법/regulus-chart-app-usage/' },
    ],
  },
  {
    name: 'Void of Course',
    icon: '/assets/images/apps/void-of-course.png',
    desc: '달이 어떤 행성과도 각을 맺지 않는 ‘공허 시간’을 알려주고 알림.',
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=dev.lioluna.voidofcourse' },
      { label: 'App Store', url: 'https://apps.apple.com/kr/app/void-of-course/id6777887938' },
      { label: '사용법', url: '/어플리케이션 사용방법/voc-app-usage/' },
    ],
  },
  {
    name: 'Numerology',
    icon: '/assets/images/apps/numerology.png',
    desc: '인생여정수·운명수 등 복잡한 수비학 공식을 한눈에 계산.',
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.numerology.finderapp' },
      { label: '사용법', url: '/어플리케이션 사용방법/num-app-usage/' },
    ],
  },
];

// Curated link hub shown on /links/ — the Linktree replacement.
// Kept deliberately short: one tap-target per line, no sub-text.
// Order = tap order on the page and the ItemList in schema.
export const HUB_LINKS: { label: string; url: string }[] = [
  { label: '블로그', url: '/' },
  { label: '앱', url: '/apps/' },
  { label: 'YouTube', url: YOUTUBE_URL },
  { label: 'X', url: X_URL },
  { label: '이메일', url: 'mailto:eyeregulus@gmail.com' },
];

// One-line blurb per category, shown on the home index.
export const CATEGORY_DESC: Record<string, string> = {
  '현대점성학 초급': '12별자리 · 2대 극성 · 4대 원소 · 3대 특질',
  '현대점성학 공통': '보이드 타임, 출생 시간 찾기 등 실전 주제',
  '어플리케이션 사용방법': 'Void of Course · 수비학 계산기 · Regulus Chart',
  '내가 바라보는 세상': '아이레굴루스란? — 점성학으로 나를 이해하는 이야기',
  '수비학': '수비학의 수와 그 의미',
  '현대점성학 중급': '',
  '현대점성학 고급': '',
};

// Order categories appear in on the home page.
export const CATEGORY_ORDER = [
  '내가 바라보는 세상',
  '어플리케이션 사용방법',
  '현대점성학 공통',
  '현대점성학 초급',
];

// _data/category_map.yml : Korean category name -> English archive slug
export const CATEGORY_MAP: Record<string, string> = {
  '현대점성학 초급': 'astrology-beginner',
  '현대점성학 중급': 'astrology-intermediate',
  '현대점성학 고급': 'astrology-advanced',
  '현대점성학 공통': 'astrology-common',
  '수비학': 'numerology',
  '내가 바라보는 세상': 'ego',
  '어플리케이션 사용방법': 'app-usage',
};

// English slug -> Korean category name (reverse lookup for archive pages)
export const CATEGORY_MAP_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_MAP).map(([k, v]) => [v, k]),
);

export function categorySlug(name: string): string {
  return CATEGORY_MAP[name] ?? slugify(name);
}

/** Percent-encode a root-relative path segment-by-segment (keeps the slashes). */
export function encodeHref(path: string): string {
  if (!path.startsWith('/')) return path;
  return path.split('/').map(encodeURIComponent).join('/');
}

// Mimics Jekyll's `slugify` filter (default mode).
export function slugify(str: string): string {
  return str
    .toString()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}
