/*
  Warnings:

  - You are about to drop the column `what_app_phone` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `whats_app_phone` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "what_app_phone",
ADD COLUMN     "whats_app_phone" TEXT NOT NULL;
