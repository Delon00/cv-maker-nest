/*
  Warnings:

  - The primary key for the `Cv` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Education` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Experience` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Template` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Cv" DROP CONSTRAINT "Cv_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Cv" DROP CONSTRAINT "Cv_userId_fkey";

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_cvId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_cvId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_cvId_fkey";

-- AlterTable
ALTER TABLE "Cv" DROP CONSTRAINT "Cv_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "templateId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Cv_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Cv_id_seq";

-- AlterTable
ALTER TABLE "Education" DROP CONSTRAINT "Education_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "cvId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Education_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Education_id_seq";

-- AlterTable
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "cvId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Experience_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Experience_id_seq";

-- AlterTable
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "cvId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Skill_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Skill_id_seq";

-- AlterTable
ALTER TABLE "Template" DROP CONSTRAINT "Template_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Template_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Template_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Cv" ADD CONSTRAINT "Cv_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cv" ADD CONSTRAINT "Cv_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
