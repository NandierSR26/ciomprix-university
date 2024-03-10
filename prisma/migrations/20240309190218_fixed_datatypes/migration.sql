/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Students` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Students` MODIFY `DNI` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Students_email_key` ON `Students`(`email`);
