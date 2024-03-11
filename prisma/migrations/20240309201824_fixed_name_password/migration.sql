/*
  Warnings:

  - You are about to drop the column `passowrd` on the `Students` table. All the data in the column will be lost.
  - Added the required column `password` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Students` DROP COLUMN `passowrd`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
