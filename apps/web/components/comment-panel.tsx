'use client';

import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Label,
  Textarea,
} from '@repo/ui';
import { trpc } from '@/lib/trpc/react';

type CommentPanelProps = {
  commentId: string | null;
  anchorX: number;
  anchorY: number;
  anchorZ: number;
  onClose: () => void;
  onCreated?: () => void;
};

const dialogShellStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #e4e4e7',
  boxShadow:
    '0 25px 50px -12px rgb(0 0 0 / 0.25), 0 0 0 1px rgb(0 0 0 / 0.05)',
  color: '#18181b',
} as const;

export function CommentPanel({
  commentId,
  anchorX,
  anchorY,
  anchorZ,
  onClose,
  onCreated,
}: CommentPanelProps) {
  const [draft, setDraft] = useState('');
  const utils = trpc.useUtils();
  const isComposer = commentId === null;
  const { data: comments, isLoading, error } = trpc.comment.list.useQuery(
    {},
    { enabled: !isComposer },
  );

  const comment = useMemo(
    () => comments?.find((item) => item.id === commentId) ?? null,
    [comments, commentId],
  );

  const createMutation = trpc.comment.create.useMutation({
    onSuccess: () => {
      utils.comment.list.invalidate();
      onCreated?.();
      onClose();
    },
  });

  const approveMutation = trpc.comment.approve.useMutation({
    onSuccess: () => utils.comment.list.invalidate(),
  });

  const rejectMutation = trpc.comment.reject.useMutation({
    onSuccess: () => utils.comment.list.invalidate(),
  });

  const deleteMutation = trpc.comment.delete.useMutation({
    onSuccess: () => {
      utils.comment.list.invalidate();
      onClose();
    },
  });

  const isMutating =
    createMutation.isPending ||
    approveMutation.isPending ||
    rejectMutation.isPending ||
    deleteMutation.isPending;

  const handleCreate = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      return;
    }
    createMutation.mutate({
      comment: trimmed,
      anchorX,
      anchorY,
      anchorZ,
    });
  };

  const handleApprove = () => {
    if (!comment) {
      return;
    }
    approveMutation.mutate({ id: comment.id });
  };

  const handleReject = () => {
    if (!comment) {
      return;
    }
    rejectMutation.mutate({ id: comment.id });
  };

  const handleDelete = () => {
    if (!comment) {
      return;
    }
    deleteMutation.mutate({ id: comment.id });
  };

  const mutationError =
    createMutation.error?.message ??
    approveMutation.error?.message ??
    rejectMutation.error?.message ??
    deleteMutation.error?.message;

  const statusLabel =
    comment?.approved === true
      ? 'Approved'
      : comment?.approved === false
        ? 'Rejected'
        : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="comment-dialog-title"
      className="
        w-80
        max-w-[90vw]
        overflow-hidden
        rounded-xl
        pointer-events-auto
        select-auto
      "
      style={dialogShellStyle}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-2
          border-b
          border-zinc-200
          px-4
          py-3
        "
      >
        <h3
          id="comment-dialog-title"
          className="
            text-base
            font-semibold
            text-zinc-900
          "
        >
          Design Comment
        </h3>
        <div
          className="
            flex
            items-center
            gap-1
          "
        >
          {!isComposer && comment ? (
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={isMutating}
              aria-label="Delete comment"
              className="
                h-8
                w-8
                px-0
                py-0
                text-zinc-600
                hover:text-red-600
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="
                  h-4
                  w-4
                "
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </Button>
          ) : null}
          <Button
            variant="outline"
            onClick={onClose}
            aria-label="Close"
            className="
              h-8
              w-8
              px-0
              py-0
              text-lg
              leading-none
            "
          >
            ×
          </Button>
        </div>
      </div>
      <div
        className="
          flex
          flex-col
          gap-3
          p-4
        "
      >
        {isComposer ? (
          <>
            <p
              className="
                text-sm
                text-zinc-500
              "
            >
              Click to leave a comment on this design. A pin will mark the spot
              after you post.
            </p>
            <div
              className="
                flex
                flex-col
                gap-2
              "
            >
              <Label htmlFor="comment-text">Comment</Label>
              <Textarea
                id="comment-text"
                autoFocus
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Add a design comment"
                className="
                  min-h-28
                  resize-y
                  border-zinc-300
                  bg-white
                  text-zinc-900
                "
              />
            </div>
            <Button
              onClick={handleCreate}
              disabled={isMutating || !draft.trim()}
            >
              Post comment
            </Button>
          </>
        ) : isLoading ? (
          <p
            className="
              text-sm
              text-zinc-500
            "
          >
            Loading comment…
          </p>
        ) : error ? (
          <p
            className="
              text-sm
              text-red-600
            "
          >
            {error.message}
          </p>
        ) : !comment ? (
          <p
            className="
              text-sm
              text-zinc-500
            "
          >
            Comment not found.
          </p>
        ) : (
          <>
            <div
              className="
                rounded-lg
                border
                border-zinc-200
                bg-zinc-50
                p-3
              "
            >
              <p
                className="
                  text-sm
                  leading-relaxed
                  text-zinc-800
                "
              >
                {comment.comment}
              </p>
            </div>
            {comment.approved === null ? (
              <div
                className="
                  flex
                  gap-2
                "
              >
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
            ) : (
              <>
                <Badge
                  variant={
                    comment.approved === true ? 'approved' : 'rejected'
                  }
                >
                  {statusLabel}
                </Badge>
                <p
                  className="
                    text-xs
                    leading-relaxed
                    text-zinc-500
                  "
                >
                  {comment.approved === true
                    ? 'This comment is finalized.'
                    : 'This comment was rejected and cannot be changed.'}
                </p>
              </>
            )}
          </>
        )}

        {mutationError ? (
          <p
            className="
              text-sm
              text-red-600
            "
          >
            {mutationError}
          </p>
        ) : null}
      </div>
    </div>
  );
}
