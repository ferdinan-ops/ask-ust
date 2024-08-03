/*
  Warnings:

  - You are about to drop the column `faculty_id` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `faculty_id` on the `lecture` table. All the data in the column will be lost.
  - You are about to drop the `faculty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `lecture` DROP FOREIGN KEY `Lecture_faculty_id_fkey`;

-- AlterTable
ALTER TABLE `course` DROP COLUMN `faculty_id`;

-- AlterTable
ALTER TABLE `lecture` DROP COLUMN `faculty_id`;

-- AlterTable
ALTER TABLE `validate` ADD COLUMN `url_quiz_record` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `faculty`;
