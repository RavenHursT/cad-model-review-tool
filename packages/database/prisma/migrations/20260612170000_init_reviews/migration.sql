CREATE TYPE "ReviewStatus" AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "target_id" TEXT NOT NULL DEFAULT 'default-cube',
    "comment" TEXT NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "reviews_target_id_key" ON "reviews"("target_id");

ALTER TABLE "reviews" ENABLE ROW LEVEL SECURITY;
