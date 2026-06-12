import type { Review, ReviewStatus } from './schemas/review.js';

export type ReviewServiceLike = {
  findByTargetId(targetId: string): Promise<Review | null>;
  create(comment: string, targetId?: string): Promise<Review>;
  updateStatus(id: string, status: ReviewStatus): Promise<Review>;
};

export type TrpcContext = {
  reviewService: ReviewServiceLike;
};
