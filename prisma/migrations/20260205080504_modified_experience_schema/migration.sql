/*
  Warnings:

  - You are about to drop the column `role` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `roleVi` on the `Experience` table. All the data in the column will be lost.
  - Added the required column `title` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Experience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleVi" TEXT,
    "period" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionVi" TEXT,
    "current" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Experience" ("company", "createdAt", "current", "description", "descriptionVi", "id", "period") SELECT "company", "createdAt", "current", "description", "descriptionVi", "id", "period" FROM "Experience";
DROP TABLE "Experience";
ALTER TABLE "new_Experience" RENAME TO "Experience";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
