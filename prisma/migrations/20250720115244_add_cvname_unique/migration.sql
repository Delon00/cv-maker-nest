/*
  Warnings:

  - You are about to drop the column `title` on the `Cv` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,cvName]` on the table `Cv` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cvName` to the `Cv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cv" DROP COLUMN "title",
ADD COLUMN     "cvName" TEXT NOT NULL,
ADD COLUMN     "profile" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Cv_userId_cvName_key" ON "Cv"("userId", "cvName");
