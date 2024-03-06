-- AlterTable
ALTER TABLE `message` MODIFY `file_url` VARCHAR(191) NOT NULL,
    MODIFY `is_deleted` BOOLEAN NOT NULL DEFAULT false;
