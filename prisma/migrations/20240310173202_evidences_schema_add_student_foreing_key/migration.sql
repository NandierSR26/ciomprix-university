/*
  Warnings:

  - Added the required column `student_id` to the `Evidences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Evidences` ADD COLUMN `student_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Evidences` ADD CONSTRAINT `Evidences_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
