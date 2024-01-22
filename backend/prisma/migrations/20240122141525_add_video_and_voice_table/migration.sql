/*
  Warnings:

  - You are about to drop the column `is_video_call_enabled` on the `forum` table. All the data in the column will be lost.
  - You are about to drop the column `is_voice_call_enabled` on the `forum` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `forum` DROP COLUMN `is_video_call_enabled`,
    DROP COLUMN `is_voice_call_enabled`;

-- CreateTable
CREATE TABLE `Video` (
    `id` VARCHAR(191) NOT NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT false,
    `member_id` VARCHAR(191) NOT NULL,
    `forum_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Video_member_id_key`(`member_id`),
    UNIQUE INDEX `Video_forum_id_key`(`forum_id`),
    INDEX `Video_member_id_idx`(`member_id`),
    INDEX `Video_forum_id_idx`(`forum_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voice` (
    `id` VARCHAR(191) NOT NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT false,
    `member_id` VARCHAR(191) NOT NULL,
    `forum_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Voice_member_id_key`(`member_id`),
    UNIQUE INDEX `Voice_forum_id_key`(`forum_id`),
    INDEX `Voice_member_id_idx`(`member_id`),
    INDEX `Voice_forum_id_idx`(`forum_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_forum_id_fkey` FOREIGN KEY (`forum_id`) REFERENCES `Forum`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voice` ADD CONSTRAINT `Voice_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voice` ADD CONSTRAINT `Voice_forum_id_fkey` FOREIGN KEY (`forum_id`) REFERENCES `Forum`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
