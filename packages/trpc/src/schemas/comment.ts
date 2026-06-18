import { z } from 'zod';

export const DEFAULT_TARGET_ID = 'default-cube';

export const commentSchema = z.object({
  id: z.string(),
  targetId: z.string(),
  comment: z.string(),
  approved: z.boolean().nullable(),
  anchorX: z.number(),
  anchorY: z.number(),
  anchorZ: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const getCommentSchema = z.object({
  id: z.string()
})

export const listCommentsInputSchema = z.object({
  targetId: z.string().optional(),
});

export const createCommentInputSchema = z.object({
  comment: z.string().min(1),
  anchorX: z.number(),
  anchorY: z.number(),
  anchorZ: z.number(),
  targetId: z.string().optional(),
});

export const updateCommentApprovalInputSchema = z.object({
  id: z.string().min(1),
});

export const deleteCommentOutputSchema = z.object({
  id: z.string(),
});

export type Comment = z.infer<typeof commentSchema>;
