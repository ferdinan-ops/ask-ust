/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Violation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Violation_user_id_key` ON `Violation`(`user_id`);
