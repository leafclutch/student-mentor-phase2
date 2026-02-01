/*
  Warnings:

  - Added the required column `status` to the `warnings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WarningStatus" AS ENUM ('ACTIVE', 'RESOLVED');

-- AlterTable
ALTER TABLE "warnings" ADD COLUMN     "status" "WarningStatus" NOT NULL;
