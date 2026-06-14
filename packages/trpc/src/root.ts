import { router } from './trpc.js';
import { commentRouter } from './routers/comment.js';
import { healthRouter } from './routers/health.js';

export const appRouter = router({
  health: healthRouter,
  comment: commentRouter,
});

export type AppRouter = typeof appRouter;
