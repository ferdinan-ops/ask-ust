/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `message` table. All the data in the column will be lost.
  - Added the required column `is_deleted` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `message` DROP COLUMN `isDeleted`,
    ADD COLUMN `is_deleted` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `is_email_verified` BOOLEAN NOT NULL DEFAULT false;
