/*
  Warnings:

  - You are about to alter the column `violation_count` on the `violation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `violation` MODIFY `violation_count` INTEGER NOT NULL DEFAULT 0;
