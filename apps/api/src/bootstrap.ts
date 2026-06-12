import { resolve } from 'node:path';
import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { type INestApplication } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from '@repo/trpc';
import express, { type Express } from 'express';
import { AppModule } from './app.module';
import { ReviewService } from './review/review.service';

config({ path: resolve(__dirname, '../../../.env') });
config({ path: resolve(__dirname, '../../../.env.local') });

export async function createApp(): Promise<Express> {
  const server = express();
  const appHolder: { app: INestApplication | null } = { app: null };

  server.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext: () => ({
        reviewService: appHolder.app!.get(ReviewService),
      }),
    }),
  );

  appHolder.app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  const { WEB_URL } = process.env;
  if (WEB_URL) {
    appHolder.app.enableCors({ origin: WEB_URL, credentials: true });
  }

  await appHolder.app.init();

  return server;
}
