import {
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { createPrismaClient, type PrismaClient } from '@repo/database';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private client: PrismaClient | null = null;

  get db(): PrismaClient {
    if (!this.client) {
      throw new Error('Prisma client is not initialized');
    }
    return this.client;
  }

  onModuleInit() {
    const { DATABASE_URL } = process.env;
    if (!DATABASE_URL) {
      throw new Error('DATABASE_URL is required');
    }
    this.client = createPrismaClient(DATABASE_URL);
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.$disconnect();
    }
  }
}
