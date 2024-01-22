-- AlterTable
ALTER TABLE `forum` ADD COLUMN `is_video_call_enabled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_voice_call_enabled` BOOLEAN NOT NULL DEFAULT false;
