/*
  Warnings:

  - You are about to drop the column `data` on the `Cv` table. All the data in the column will be lost.
  - Added the required column `city` to the `Cv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Cv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Cv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Cv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Cv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile` to the `Cv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cv" DROP COLUMN "data",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "profile" TEXT NOT NULL;
