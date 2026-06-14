import type { Comment } from './schemas/comment.js';

export type CommentServiceLike = {
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
