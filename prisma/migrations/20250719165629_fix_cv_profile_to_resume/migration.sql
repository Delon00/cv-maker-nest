/*
  Warnings:

  - You are about to drop the column `profile` on the `Cv` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cv" DROP COLUMN "profile",
ADD COLUMN     "resume" TEXT;
