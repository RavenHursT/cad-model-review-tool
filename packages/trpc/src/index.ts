import { appRouter, type AppRouter } from './root.js';
import type { TrpcContext } from './context.js';

export { appRouter, type AppRouter };

export type { ReviewServiceLike, TrpcContext } from './context.js';
export {
  createReviewInputSchema,
  DEFAULT_TARGET_ID,
  getReviewInputSchema,
  reviewSchema,
  reviewStatusSchema,
  updateReviewStatusInputSchema,
  type Review,
  type ReviewStatus,
} from './schemas/review.js';

export type AppCaller = ReturnType<typeof appRouter.createCaller>;

export function createCaller(ctx: TrpcContext): AppCaller {
  return appRouter.createCaller(ctx);
}
