/*
  Warnings:

  - You are about to drop the column `descriptionVi` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `titleVi` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionVi` on the `experience` table. All the data in the column will be lost.
  - You are about to drop the column `titleVi` on the `experience` table. All the data in the column will be lost.
  - You are about to drop the column `bioVi` on the `user` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "techStack" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT,
    "github" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("createdAt", "description", "featured", "github", "id", "image", "link", "techStack", "title", "updatedAt") SELECT "createdAt", "description", "featured", "github", "id", "image", "link", "techStack", "title", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_experience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "order" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "current" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_experience" ("company", "createdAt", "current", "description", "endDate", "id", "order", "startDate", "title", "updatedAt") SELECT "company", "createdAt", "current", "description", "endDate", "id", "order", "startDate", "title", "updatedAt" FROM "experience";
DROP TABLE "experience";
ALTER TABLE "new_experience" RENAME TO "experience";
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "jobTitle" TEXT,
    "bio" TEXT,
    "techStack" TEXT,
    "devNickname" TEXT,
    "contactEmail" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,
    "isOpenForWork" BOOLEAN NOT NULL DEFAULT true,
    "socials" TEXT
);
INSERT INTO "new_user" ("address", "bio", "contactEmail", "createdAt", "devNickname", "email", "emailVerified", "id", "image", "isOpenForWork", "jobTitle", "name", "phoneNumber", "socials", "techStack", "updatedAt") SELECT "address", "bio", "contactEmail", "createdAt", "devNickname", "email", "emailVerified", "id", "image", "isOpenForWork", "jobTitle", "name", "phoneNumber", "socials", "techStack", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
