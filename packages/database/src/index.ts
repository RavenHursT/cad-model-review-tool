import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

export function createPrismaClient(connectionString: string) {
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export { PrismaClient };
export { ReviewStatus } from '../generated/prisma/client.js';
export type { Review } from '../generated/prisma/client.js';
