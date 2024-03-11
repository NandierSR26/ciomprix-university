-- DropForeignKey
ALTER TABLE `Evidences` DROP FOREIGN KEY `Evidences_id_fkey`;

-- AddForeignKey
ALTER TABLE `Evidences` ADD CONSTRAINT `Evidences_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subjects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
