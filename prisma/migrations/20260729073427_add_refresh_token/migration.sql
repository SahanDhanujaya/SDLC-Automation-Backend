/*
  Warnings:

  - You are about to drop the column `userLastLogin` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_email_idx";

-- DropIndex
DROP INDEX "User_username_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userLastLogin",
ADD COLUMN     "hashedRefreshToken" TEXT,
ADD COLUMN     "providerId" TEXT,
ALTER COLUMN "username" DROP NOT NULL;
