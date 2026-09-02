import type { APIRoute } from 'astro';
import { SITE } from '../consts';
import { getSortedPosts, postPath, excerptText } from '../lib/posts';

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function encodePath(p: string): string {
  return p
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/');
}

function rfc822(d: Date): string {
  return d.toUTCString().replace('GMT', '+0000');
}

export const GET: APIRoute = async () => {
  const posts = (await getSortedPosts()).slice(0, 10);
  const lastBuild = posts[0] ? rfc822(posts[0].data.date) : '';

  const items = posts
    .map((post) => {
      const url = SITE.url + encodePath(postPath(post));
      return `	<item>
		<title>${xmlEscape(post.data.title)}</title>
		<description>${xmlEscape(excerptText(post, 5000))}</description>
		<pubDate>${rfc822(post.data.date)}</pubDate>
		<link>${url}</link>
		<guid isPermaLink="true">${url}</guid>
	</item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(SITE.name)}</title>
    <description>${xmlEscape(SITE.description)}</description>
    <link>${SITE.url}</link>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
	<lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
