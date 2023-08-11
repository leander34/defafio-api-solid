/*
  Warnings:

  - Added the required column `type` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('dog', 'cat');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "type" "PetType" NOT NULL;
