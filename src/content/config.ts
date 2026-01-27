import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    linkedin_url: z.string().optional(),
    image: z.string().optional(),
    image_alt: z.string().optional(),
  }),
});

export const collections = { blog };
