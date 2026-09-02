import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const featureItem = z.object({
  image_path: z.string().optional(),
  alt: z.string().optional(),
  title: z.string().optional(),
  excerpt: z.string().optional(),
  image_caption: z.string().optional(),
  url: z.string().optional(),
  btn_label: z.string().optional(),
  btn_class: z.string().optional(),
  url2: z.string().optional(),
  btn_label2: z.string().optional(),
  btn2_class: z.string().optional(),
  url3: z.string().optional(),
  btn_label3: z.string().optional(),
  btn3_class: z.string().optional(),
  url4: z.string().optional(),
  btn_label4: z.string().optional(),
  btn4_class: z.string().optional(),
  url5: z.string().optional(),
  btn_label5: z.string().optional(),
  btn5_class: z.string().optional(),
});

// Keep the original filename (with its exact casing) as the entry id so the
// built URLs match the old Jekyll permalinks byte-for-byte.
const keepFilenameId = ({ entry }: { entry: string }) =>
  entry.replace(/\.md$/, '');

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/posts',
    generateId: keepFilenameId,
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    pinned: z.boolean().default(false),
    feature_row: z.array(featureItem).optional(),
  }),
});

const pages = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/pages',
    generateId: keepFilenameId,
  }),
  schema: z.object({
    title: z.string(),
    permalink: z.string(),
    layout: z.enum(['single', 'splash']).default('single'),
    overlay_image: z.string().optional(),
    overlay_filter: z.union([z.string(), z.number()]).optional(),
    feature_row: z.array(featureItem).optional(),
    feature_row_wrapper_class: z.string().optional(),
  }),
});

export const collections = { posts, pages };
