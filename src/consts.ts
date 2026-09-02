// Site-wide configuration ported from the old Jekyll _config.yml / _data.

export const SITE = {
  title: 'Eyeregulus',
  titleSeparator: '-',
  name: 'eyeregulus',
  description: '',
  url: 'https://eyeregulus.dev',
  locale: 'en-US',
  ogLocale: 'en_US',
  wordsPerMinute: 200,
  defaultOgImage: '/assets/images/Category/_Background.png',
  googleSiteVerification: 'ckejiakpT65_svdpAjoaXIyEPq3GH89EL-gHGyA_7Cs',
  gtmId: 'GTM-PTHH9S4T',
  gtagId: 'GTM-PWXGJ4JB',
};

export const AUTHOR = {
  name: 'eyeregulus',
  bio: '**Fathoming the world with the eyes of a lion**',
  location: 'Elsewhere',
  email: 'eyeregulus@gmail.com',
  links: [
    { label: 'Twitter', icon: 'fab fa-fw fa-twitter-square', url: 'https://x.com/ain_alion20462' },
  ],
};

export const TAGLINE = '사자의 눈으로 세상을 헤아립니다';
export const INTRO = '현대점성학과 수비학으로 나를 이해하는 이야기.';

// Masthead navigation (_data/navigation.yml -> main)
export const MAIN_NAV = [
  { title: 'About', url: '/about/' },
  { title: 'Apps', url: '/apps/' },
  { title: 'Review', url: '/review/' },
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
  '현대점성학 초급',
  '현대점성학 공통',
  '어플리케이션 사용방법',
  '내가 바라보는 세상',
];

// Footer follow links (_config.yml -> footer.links, only those with a url)
export const FOOTER_LINKS = [
  { label: 'Email', icon: 'fas fa-fw fa-envelope-square', url: 'mailto:eyeregulus@gmail.com' },
  { label: 'Twitter', icon: 'fab fa-fw fa-twitter-square', url: 'https://x.com/ain_alion20462' },
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
