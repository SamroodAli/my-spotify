/*
  Warnings:

  - Added the required column `url` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstNname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstNname" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
