import { z } from 'zod';
import { publicProcedure, router } from '../trpc.js';
import {
  commentSchema,
  createCommentInputSchema,
  DEFAULT_TARGET_ID,
  deleteCommentOutputSchema,
  getCommentSchema,
  listCommentsInputSchema,
  updateCommentApprovalInputSchema,
} from '../schemas/comment.js';

export const commentRouter = router({
  getById: publicProcedure
    .input(getCommentSchema)
    .output(commentSchema.nullable())
    .query(({ ctx, input: {id} }) => ctx.commentService.getById(id)),

  list: publicProcedure
    .input(listCommentsInputSchema)
    .output(z.array(commentSchema))
    .query(({ ctx, input }) => {
      const { targetId = DEFAULT_TARGET_ID } = input;
      return ctx.commentService.listByTargetId(targetId);
    }),

  create: publicProcedure
    .input(createCommentInputSchema)
    .output(commentSchema)
    .mutation(({ ctx, input }) => ctx.commentService.create(input)),

  approve: publicProcedure
    .input(updateCommentApprovalInputSchema)
    .output(commentSchema)
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.commentService.setApproved(id, true);
    }),

  reject: publicProcedure
    .input(updateCommentApprovalInputSchema)
    .output(commentSchema)
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.commentService.setApproved(id, false);
    }),

  delete: publicProcedure
    .input(updateCommentApprovalInputSchema)
    .output(deleteCommentOutputSchema)
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.commentService.delete(id);
    }),
});
