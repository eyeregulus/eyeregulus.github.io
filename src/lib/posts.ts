import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE, categorySlug } from '../consts';

export type Post = CollectionEntry<'posts'>;

/** Reverse-chronological, matching Jekyll (date desc, then filename desc). */
export async function getSortedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => {
    const d = b.data.date.getTime() - a.data.date.getTime();
    if (d !== 0) return d;
    return b.id.localeCompare(a.id);
  });
}

/** Permalink for a post: /<korean category>/<slug>/  (Jekyll `/:categories/:title/`). */
export function postPath(post: Post): string {
  const cat = post.data.categories[0] ?? '';
  return `/${cat}/${post.id}/`;
}

/** Same path, percent-encoded per segment (what the old Jekyll links/sitemap used). */
export function postHref(post: Post): string {
  return postPath(post)
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/');
}

/** First paragraph of the body, roughly like Jekyll's `excerpt_separator: "\n\n"`. */
export function excerptOf(post: Post): string {
  const body = (post.body ?? '').replace(/^\s*---[\s\S]*?---\s*/, '');
  const firstBlock = body.split(/\n\s*\n/).map((s) => s.trim()).find(Boolean) ?? '';
  return firstBlock;
}

/** Plain-text excerpt truncated to n chars (archive card / meta description). */
export function excerptText(post: Post, n = 160): string {
  const t = stripToText(excerptOf(post)).trim();
  return t.length > n ? t.slice(0, n) : t;
}

/**
 * Approximates Jekyll's `markdownify | strip_html` for a short excerpt:
 * removes inline emphasis / link / image syntax and leading block markers,
 * but keeps a bare "#" that is not an ATX heading (matches kramdown).
 */
export function stripToText(md: string): string {
  return md
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '') // ATX heading marker (space required)
    .replace(/^\s{0,3}>\s?/gm, '') // blockquote
    .replace(/^\s*([*+-]|\d+\.)\s+/gm, '') // list marker
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ');
}

/** Jekyll read-time string: "less than 1 minute read" / "1 minute read" / "N minute read". */
export function readTime(post: Post): string {
  const words = stripToText(post.body ?? '').split(/\s+/).filter(Boolean).length;
  const wpm = SITE.wordsPerMinute;
  if (words < wpm) return 'less than 1 minute read';
  if (words === wpm) return '1 minute read';
  return `${Math.floor(words / wpm)} minute read`;
}

export { categorySlug };
