import { appRouter, type AppRouter } from './root.js';
import type { TrpcContext } from './context.js';

export { appRouter, type AppRouter };

export type { CommentServiceLike, TrpcContext } from './context.js';
export {
  commentSchema,
  createCommentInputSchema,
  DEFAULT_TARGET_ID,
  listCommentsInputSchema,
  updateCommentApprovalInputSchema,
  type Comment,
} from './schemas/comment.js';

export type AppCaller = ReturnType<typeof appRouter.createCaller>;

export function createCaller(ctx: TrpcContext): AppCaller {
  return appRouter.createCaller(ctx);
}
