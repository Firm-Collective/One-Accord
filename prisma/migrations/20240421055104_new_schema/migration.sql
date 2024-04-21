/*
  Warnings:

  - You are about to drop the column `ipCountry` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `City` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Country` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "ipCountry",
ADD COLUMN     "City" TEXT NOT NULL,
ADD COLUMN     "Country" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
