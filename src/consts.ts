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

// Masthead navigation (_data/navigation.yml -> main)
export const MAIN_NAV = [
  { title: 'About', url: '/about/' },
  { title: 'Apps', url: '/apps/' },
  { title: 'Review', url: '/review/' },
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

// Mimics Jekyll's `slugify` filter (default mode).
export function slugify(str: string): string {
  return str
    .toString()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}
