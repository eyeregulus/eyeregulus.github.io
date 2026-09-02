// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import remarkCjkFriendly from 'remark-cjk-friendly';

// https://astro.build/config
export default defineConfig({
  site: 'https://eyeregulus.dev',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
  markdown: {
    // The old site rendered with kramdown (GFM). Astro's GFM is on by default;
    // remark-cjk-friendly restores **bold** / *italic* next to Korean text.
    remarkPlugins: [remarkCjkFriendly],
    rehypePlugins: [rehypeSlug],
    // Match Minimal Mistakes' plain <pre><code> styling instead of Shiki boxes.
    syntaxHighlight: false,
  },
});
