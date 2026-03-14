import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    linkedin_url: z.string().optional(),
    image: image().optional(),
    image_alt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    key_takeaways: z.array(z.string()).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    show_roi_calculator: z.boolean().optional(),
    download_card: z.object({
      title: z.string(),
      description: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
      image: image().optional(),
    }).optional(),
  }),
});

const glossar = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    image: image().optional(),
    image_alt: z.string().optional(),
    related_terms: z.array(z.string()).optional(),
    key_takeaways: z.array(z.string()).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    tacheles: z.string().optional(),
  }),
});

export const collections = { blog, glossar };
