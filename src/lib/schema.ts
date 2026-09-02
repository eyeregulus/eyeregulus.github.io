import { SITE, SAME_AS, APPS, encodeHref } from '../consts';

const abs = (path: string) => new URL(path, SITE.url).href;

/** Site-wide Organization + WebSite. Emitted on every page. */
export function siteSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.title,
      alternateName: '아이레굴루스',
      url: SITE.url + '/',
      logo: abs('/assets/images/apps/regulus-chart.png'),
      email: 'eyeregulus@gmail.com',
      sameAs: SAME_AS,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.title,
      url: SITE.url + '/',
      inLanguage: 'ko-KR',
      description: SITE.description,
      publisher: { '@type': 'Organization', name: SITE.title },
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
