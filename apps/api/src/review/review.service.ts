import { Injectable } from '@nestjs/common';
import { TRPCError } from '@trpc/server';
import type { Review as PrismaReview } from '@repo/database';
import {
  DEFAULT_TARGET_ID,
  type Review,
  type ReviewServiceLike,
  type ReviewStatus,
} from '@repo/trpc';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewService implements ReviewServiceLike {
  constructor(private readonly prisma: PrismaService) {}

  findByTargetId(targetId: string): Promise<Review | null> {
    return this.prisma.db.review
      .findUnique({ where: { targetId } })
      .then((review) => (review ? this.toReview(review) : null));
  }

  async create(comment: string, targetId = DEFAULT_TARGET_ID): Promise<Review> {
    const existing = await this.prisma.db.review.findUnique({
      where: { targetId },
    });

    if (existing) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'A review already exists for this target',
      });
    }

    const review = await this.prisma.db.review.create({
      data: { comment, targetId },
    });

    return this.toReview(review);
  }

  async updateStatus(id: string, status: ReviewStatus): Promise<Review> {
    const existing = await this.prisma.db.review.findUnique({ where: { id } });

    if (!existing) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Review not found',
      });
    }

    if (existing.status !== 'pending') {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Only pending reviews can be updated',
      });
    }

    const review = await this.prisma.db.review.update({
      where: { id },
      data: { status },
    });

    return this.toReview(review);
  }

  private toReview(review: PrismaReview): Review {
    const { id, targetId, comment, status, createdAt, updatedAt } = review;
    return { id, targetId, comment, status, createdAt, updatedAt };
  }
}
