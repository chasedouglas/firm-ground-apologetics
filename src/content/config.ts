import { defineCollection, z } from 'astro:content';

const SourceSchema = z.object({
  id: z.string(),
  author: z.string(),
  title: z.string(),
  publisher: z.string().optional(),
  year: z.number().optional(),
  url: z.string().optional(),
  type: z.enum(['primary', 'academic', 'apologetic', 'skeptical', 'reference']),
});

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.string(),
    subsection: z.string().optional(),
    order: z.number(),
    lastUpdated: z.date(),
    sources: z.array(SourceSchema).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };
