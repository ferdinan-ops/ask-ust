-- AlterTable
ALTER TABLE `user` ADD COLUMN `banned_until` DATETIME(3) NULL,
    ADD COLUMN `is_banned` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Violation` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `violation_count` VARCHAR(191) NOT NULL DEFAULT '0',
    `last_violation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Violation` ADD CONSTRAINT `Violation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
