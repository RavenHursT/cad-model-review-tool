import type { Comment } from './schemas/comment.js';

export type CommentServiceLike = {
  getById(id: string): Promise<Comment | null>;
  listByTargetId(targetId: string): Promise<Comment[]>;
  create(input: {
    comment: string;
    anchorX: number;
    anchorY: number;
    anchorZ: number;
    targetId?: string;
  }): Promise<Comment>;
  setApproved(id: string, approved: boolean): Promise<Comment>;
  delete(id: string): Promise<{ id: string }>;
};

export type TrpcContext = {
  commentService: CommentServiceLike;
};
