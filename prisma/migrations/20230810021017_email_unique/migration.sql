/*
  Warnings:

  - You are about to drop the column `characteristics` on the `pets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `about` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ambience` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energy` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `independence` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `port` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `age` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "characteristics",
ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "ambience" INTEGER NOT NULL,
ADD COLUMN     "energy" INTEGER NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "independence" INTEGER NOT NULL,
ADD COLUMN     "port" INTEGER NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
DROP COLUMN "age",
ADD COLUMN     "age" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "photos" (
    "id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requirements" (
    "id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "requirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
