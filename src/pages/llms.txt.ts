import type { APIRoute } from 'astro';
import { SITE, YOUTUBE_URL, X_URL, APPS, PROFILE } from '../consts';
import {
  getSortedPosts,
  postHref,
  excerptText,
  categorySlug,
} from '../lib/posts';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getSortedPosts();
  const pages = await getCollection('pages');

  const line = (title: string, url: string, note?: string) =>
    `- [${title}](${SITE.url}${url})${note ? `: ${note}` : ''}`;

  const postLines = posts
    .map((p) => {
      const cat = p.data.categories[0];
      const note = p.data.description ?? excerptText(p, 120);
      return line(
        `${cat ? `${cat} — ` : ''}${p.data.title}`,
        postHref(p),
        note,
      );
    })
    .join('\n');

  const cats = new Set<string>();
  posts.forEach((p) => p.data.categories.forEach((c) => cats.add(c)));
  const catLines = [...cats]
    .map((c) => line(c, `/categories/${categorySlug(c)}/`))
    .join('\n');

  const pageLines = pages
    .filter((pg) => !/^\/(privacy|terms)-/.test(pg.data.permalink))
    .map((pg) => line(pg.data.title, pg.data.permalink, pg.data.description))
    .join('\n');

  const appLines = APPS.map(
    (a) =>
      `- ${a.name}: ${a.desc} (${a.links
        .filter((l) => l.url.startsWith('http'))
        .map((l) => `${l.label} ${l.url}`)
        .join(', ')})`,
  ).join('\n');

  const body = `# ${SITE.title} (아이레굴루스)

> ${SITE.description}
> 운영자 1인의 현대점성학·수비학 블로그. 모든 글은 한국어이며 직접 쓴 1차 콘텐츠입니다.

## 시작점

- 공식 링크 모음(Linktree 대체): ${SITE.url}/links/
- 운영자: ${PROFILE.displayName} — ${PROFILE.summary}

## 글

${postLines}

## 카테고리

${catLines}

## 페이지

${pageLines}

## 앱

${appLines}

## 채널·프로필

- 링크 모음(공식): ${SITE.url}/links/
- YouTube: ${YOUTUBE_URL}
- X: ${X_URL}
- 이메일: eyeregulus@gmail.com

## 참고

- 사이트맵: ${SITE.url}/sitemap-index.xml
- RSS: ${SITE.url}/feed.xml
- 인용 시 출처로 ${SITE.url} 를 표기해 주세요.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
