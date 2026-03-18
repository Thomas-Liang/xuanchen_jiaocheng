import { z } from 'zod';

const nonEmptyString = z.string().min(1, '不能为空');

const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日期格式应为 YYYY-MM-DD');

export const TutorialFrontmatterSchema = z.object({
  title: nonEmptyString,
  description: nonEmptyString,
  author: nonEmptyString,
  publishDate: dateString,
  lastModified: dateString.optional(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  videoUrl: z.string().url().optional().or(z.literal('')),
  projectUrl: z.string().url().optional().or(z.literal('')),
  isDraft: z.boolean().default(false),
});
