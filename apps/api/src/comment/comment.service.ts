import { Injectable } from '@nestjs/common';
import { TRPCError } from '@trpc/server';
import type { Comment as PrismaComment } from '@repo/database';
import {
  DEFAULT_TARGET_ID,
  type Comment,
  type CommentServiceLike,
} from '@repo/trpc';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService implements CommentServiceLike {
  constructor(private readonly prisma: PrismaService) {}

  listByTargetId(targetId: string): Promise<Comment[]> {
    return this.prisma.db.comment
      .findMany({
        where: { targetId },
        orderBy: { createdAt: 'asc' },
      })
      .then((comments) => comments.map((comment) => this.toComment(comment)));
  }

  async create(input: {
    comment: string;
    anchorX: number;
    anchorY: number;
    anchorZ: number;
    targetId?: string;
  }): Promise<Comment> {
    const {
      comment,
      anchorX,
      anchorY,
      anchorZ,
      targetId = DEFAULT_TARGET_ID,
    } = input;

    const created = await this.prisma.db.comment.create({
      data: {
        comment,
        anchorX,
        anchorY,
        anchorZ,
        targetId,
        approved: null,
      },
    });

    return this.toComment(created);
  }

  async setApproved(id: string, approved: boolean): Promise<Comment> {
    const existing = await this.prisma.db.comment.findUnique({ where: { id } });

    if (!existing) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Comment not found',
      });
    }

    if (existing.approved !== null) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Only unresolved comments can be updated',
      });
    }

    const updated = await this.prisma.db.comment.update({
      where: { id },
      data: { approved },
    });

    return this.toComment(updated);
  }

  async delete(id: string): Promise<{ id: string }> {
    const existing = await this.prisma.db.comment.findUnique({ where: { id } });

    if (!existing) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Comment not found',
      });
    }

    await this.prisma.db.comment.delete({ where: { id } });

    return { id };
  }

  private toComment(comment: PrismaComment): Comment {
    const {
      id,
      targetId,
      comment: text,
      approved,
      anchorX,
      anchorY,
      anchorZ,
      createdAt,
      updatedAt,
    } = comment;
    return {
      id,
      targetId,
      comment: text,
      approved,
      anchorX,
      anchorY,
      anchorZ,
      createdAt,
      updatedAt,
    };
  }
}
