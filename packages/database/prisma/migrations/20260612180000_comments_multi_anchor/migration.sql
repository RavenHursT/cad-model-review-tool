DROP TABLE "reviews";

DROP TYPE "ReviewStatus";

CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "target_id" TEXT NOT NULL DEFAULT 'default-cube',
    "comment" TEXT NOT NULL,
    "approved" BOOLEAN,
    "anchor_x" DOUBLE PRECISION NOT NULL,
    "anchor_y" DOUBLE PRECISION NOT NULL,
    "anchor_z" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "comments_target_id_idx" ON "comments"("target_id");

ALTER TABLE "comments" ENABLE ROW LEVEL SECURITY;
