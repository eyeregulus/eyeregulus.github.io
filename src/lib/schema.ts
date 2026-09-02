import { SITE, SAME_AS, APPS, PROFILE, HUB_LINKS, encodeHref } from '../consts';

const abs = (path: string) => new URL(path, SITE.url).href;

const PERSON_ID = SITE.url + '/#person';
const ORG_ID = SITE.url + '/#organization';
const SITE_ID = SITE.url + '/#website';

/** Site-wide Person + Organization + WebSite. Emitted on every page so search
 *  engines and AI resolve the brand to one linked entity (sameAs everywhere). */
export function siteSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': PERSON_ID,
      name: PROFILE.displayName,
      alternateName: PROFILE.alternateNames,
      url: SITE.url + '/',
      image: abs(PROFILE.avatar),
      description: PROFILE.summary,
      email: 'eyeregulus@gmail.com',
      knowsAbout: PROFILE.knowsAbout,
      sameAs: SAME_AS,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': ORG_ID,
      name: SITE.title,
      alternateName: '아이레굴루스',
      url: SITE.url + '/',
      logo: abs('/assets/images/apps/regulus-chart.png'),
      email: 'eyeregulus@gmail.com',
      founder: { '@id': PERSON_ID },
      sameAs: SAME_AS,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': SITE_ID,
      name: SITE.title,
      url: SITE.url + '/',
      inLanguage: 'ko-KR',
      description: SITE.description,
      publisher: { '@id': ORG_ID },
    },
  ];
}

/** ProfilePage + ItemList for the /links/ hub (the Linktree replacement). */
export function profilePageSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': SITE.url + '/links/#profilepage',
      url: SITE.url + '/links/',
      name: `${PROFILE.displayName} — 모든 링크`,
      inLanguage: 'ko-KR',
      isPartOf: { '@id': SITE_ID },
      about: { '@id': PERSON_ID },
      mainEntity: { '@id': PERSON_ID },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${PROFILE.displayName} 링크 모음`,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: HUB_LINKS.length,
      itemListElement: HUB_LINKS.map((l, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: l.label,
        url: l.url.startsWith('/') ? SITE.url + l.url : l.url,
      })),
    },
  ];
}

interface PostSchemaInput {
  title: string;
  description: string;
  url: string; // percent-encoded path
  datePublished: string; // ISO
  dateModified?: string;
  image?: string;
  category?: string;
  categoryUrl?: string;
}

/** BlogPosting + BreadcrumbList for an article. */
export function postSchema(p: PostSchemaInput) {
  const pageUrl = SITE.url + p.url;
  const image = abs(p.image ?? SITE.defaultOgImage);

  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    image,
    inLanguage: 'ko-KR',
    datePublished: p.datePublished,
    dateModified: p.dateModified ?? p.datePublished,
    author: { '@type': 'Person', name: SITE.name, url: SITE.url + '/' },
    publisher: {
      '@type': 'Organization',
      name: SITE.title,
      logo: {
        '@type': 'ImageObject',
        url: abs('/assets/images/apps/regulus-chart.png'),
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    ...(p.category ? { articleSection: p.category } : {}),
  };

  const crumbs: { name: string; item?: string }[] = [
    { name: '홈', item: SITE.url + '/' },
  ];
  if (p.category && p.categoryUrl) {
    crumbs.push({ name: p.category, item: SITE.url + p.categoryUrl });
  }
  crumbs.push({ name: p.title });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.item ? { item: c.item } : {}),
    })),
  };

  return [article, breadcrumb];
}

/** SoftwareApplication for each of the apps (used on /apps/). */
export function appsSchema() {
  return APPS.map((app) => {
    const play = app.links.find((l) => l.url.includes('play.google.com'))?.url;
    const appstore = app.links.find((l) => l.url.includes('apps.apple.com'))?.url;
    const usage = app.links.find((l) => l.label === '사용법')?.url;
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: app.name,
      description: app.desc,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: appstore ? 'ANDROID, iOS' : 'ANDROID',
      image: abs(app.icon),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
      author: { '@type': 'Organization', name: SITE.title },
      sameAs: [play, appstore].filter(Boolean),
      ...(usage ? { url: SITE.url + encodeHref(usage) } : {}),
    };
  });
}
