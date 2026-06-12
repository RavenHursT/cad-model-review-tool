import { router } from './trpc.js';
import { healthRouter } from './routers/health.js';
import { reviewRouter } from './routers/review.js';

export const appRouter = router({
  health: healthRouter,
  review: reviewRouter,
});

export type AppRouter = typeof appRouter;
