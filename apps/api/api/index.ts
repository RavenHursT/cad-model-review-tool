import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Application } from 'express';
import { createApp } from '../src/bootstrap';

let cachedServer: Application | null = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cachedServer = cachedServer ?? (await createApp());
  return cachedServer(req, res);
}
