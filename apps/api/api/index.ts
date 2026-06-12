import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Express } from 'express';
import { createApp } from '../src/bootstrap';

let cachedServer: Express | null = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cachedServer = cachedServer ?? (await createApp());
  return cachedServer(req, res);
}
