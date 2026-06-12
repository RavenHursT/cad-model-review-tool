'use client';

import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Textarea,
} from '@repo/ui';
import { trpc } from '@/lib/trpc/react';

type ReviewPanelProps = {
  onClose: () => void;
};

export function ReviewPanel({ onClose }: ReviewPanelProps) {
  const [comment, setComment] = useState('');
  const utils = trpc.useUtils();
  const { data: review, isLoading, error } = trpc.review.get.useQuery({});

  const createMutation = trpc.review.create.useMutation({
    onSuccess: () => utils.review.get.invalidate(),
  });

  const approveMutation = trpc.review.approve.useMutation({
    onSuccess: () => utils.review.get.invalidate(),
  });

  const rejectMutation = trpc.review.reject.useMutation({
    onSuccess: () => utils.review.get.invalidate(),
  });

  const isMutating =
    createMutation.isPending ||
    approveMutation.isPending ||
    rejectMutation.isPending;

  const handleCreate = () => {
    const trimmed = comment.trim();
    if (!trimmed) {
      return;
    }
    createMutation.mutate({ comment: trimmed });
  };

  const handleApprove = () => {
    if (!review) {
      return;
    }
    approveMutation.mutate({ id: review.id });
  };

  const handleReject = () => {
    if (!review) {
      return;
    }
    rejectMutation.mutate({ id: review.id });
  };

  const mutationError =
    createMutation.error?.message ??
    approveMutation.error?.message ??
    rejectMutation.error?.message;

  return (
    <Card
      className="
        w-72
        pointer-events-auto
        select-auto
      "
      onPointerDown={(event) => event.stopPropagation()}
    >
      <CardHeader>
        <CardTitle>Design Review</CardTitle>
      </CardHeader>
      <CardContent
        className="
          flex
          flex-col
          gap-3
        "
      >
        {isLoading ? (
          <p className="text-sm text-zinc-500">Loading review…</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error.message}</p>
        ) : !review ? (
          <>
            <div className="flex flex-col gap-2">
              <Label htmlFor="review-comment">Comment</Label>
              <Textarea
                id="review-comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Add a design review comment"
              />
            </div>
            <Button
              onClick={handleCreate}
              disabled={isMutating || !comment.trim()}
            >
              Submit review
            </Button>
          </>
        ) : review.status === 'pending' ? (
          <>
            <p className="text-sm text-zinc-700">{review.comment}</p>
            <Badge variant="pending">Pending</Badge>
            <div className="flex gap-2">
              <Button onClick={handleApprove} disabled={isMutating}>
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={isMutating}
              >
                Reject
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-zinc-700">{review.comment}</p>
            <Badge
              variant={review.status === 'approved' ? 'approved' : 'rejected'}
            >
              {review.status === 'approved' ? 'Approved' : 'Rejected'}
            </Badge>
          </>
        )}

        {mutationError ? (
          <p className="text-sm text-red-600">{mutationError}</p>
        ) : null}

        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </CardContent>
    </Card>
  );
}
