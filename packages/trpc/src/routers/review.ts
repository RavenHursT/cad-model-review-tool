import { publicProcedure, router } from '../trpc.js';
import {
  createReviewInputSchema,
  DEFAULT_TARGET_ID,
  getReviewInputSchema,
  reviewSchema,
  updateReviewStatusInputSchema,
} from '../schemas/review.js';

export const reviewRouter = router({
  get: publicProcedure
    .input(getReviewInputSchema)
    .output(reviewSchema.nullable())
    .query(({ ctx, input }) => {
      const { targetId = DEFAULT_TARGET_ID } = input;
      return ctx.reviewService.findByTargetId(targetId);
    }),

  create: publicProcedure
    .input(createReviewInputSchema)
    .output(reviewSchema)
    .mutation(({ ctx, input }) => {
      const { comment } = input;
      return ctx.reviewService.create(comment);
    }),

  approve: publicProcedure
    .input(updateReviewStatusInputSchema)
    .output(reviewSchema)
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.reviewService.updateStatus(id, 'approved');
    }),

  reject: publicProcedure
    .input(updateReviewStatusInputSchema)
    .output(reviewSchema)
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.reviewService.updateStatus(id, 'rejected');
    }),
});
