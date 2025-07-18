/*
  Warnings:

  - You are about to drop the column `endDate` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Interest` table. All the data in the column will be lost.
  - Added the required column `name_interest` to the `Interest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endYear" TEXT,
ADD COLUMN     "startYear" TEXT;

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endMonth" TEXT,
ADD COLUMN     "endYear" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "startMonth" TEXT,
ADD COLUMN     "startYear" TEXT,
ALTER COLUMN "company" DROP NOT NULL,
ALTER COLUMN "jobTitle" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Interest" DROP COLUMN "name",
ADD COLUMN     "name_interest" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileExperience" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "company" TEXT,
    "location" TEXT,
    "jobTitle" TEXT,
    "description" TEXT,
    "startMonth" TEXT,
    "startYear" TEXT,
    "endMonth" TEXT,
    "endYear" TEXT,

    CONSTRAINT "ProfileExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileMission" (
    "id" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProfileMission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileEducation" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "school" TEXT,
    "location" TEXT,
    "field" TEXT,
    "startYear" TEXT,
    "endYear" TEXT,

    CONSTRAINT "ProfileEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileSkill" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProfileSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileLanguage" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT,

    CONSTRAINT "ProfileLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileInterest" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "name_interest" TEXT NOT NULL,

    CONSTRAINT "ProfileInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileCertification" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "institution" TEXT,
    "date" TIMESTAMP(3),

    CONSTRAINT "ProfileCertification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileExperience" ADD CONSTRAINT "ProfileExperience_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileMission" ADD CONSTRAINT "ProfileMission_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "ProfileExperience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileEducation" ADD CONSTRAINT "ProfileEducation_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileSkill" ADD CONSTRAINT "ProfileSkill_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileLanguage" ADD CONSTRAINT "ProfileLanguage_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileInterest" ADD CONSTRAINT "ProfileInterest_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileCertification" ADD CONSTRAINT "ProfileCertification_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
