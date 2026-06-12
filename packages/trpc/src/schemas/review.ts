import { z } from 'zod';

export const DEFAULT_TARGET_ID = 'default-cube';

export const reviewStatusSchema = z.enum(['pending', 'approved', 'rejected']);

export const reviewSchema = z.object({
  id: z.string(),
  targetId: z.string(),
  comment: z.string(),
  status: reviewStatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const getReviewInputSchema = z.object({
  targetId: z.string().optional(),
});

export const createReviewInputSchema = z.object({
  comment: z.string().min(1),
});

export const updateReviewStatusInputSchema = z.object({
  id: z.string().min(1),
});

export type Review = z.infer<typeof reviewSchema>;
export type ReviewStatus = z.infer<typeof reviewStatusSchema>;
