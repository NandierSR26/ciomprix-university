/*
  Warnings:

  - Added the required column `subject_id` to the `Evidences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Evidences` ADD COLUMN `subject_id` VARCHAR(191) NOT NULL;
