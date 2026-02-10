-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "bioVi" TEXT,
    "techStack" TEXT,
    "devNickname" TEXT,
    "contactEmail" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,
    "isOpenForWork" BOOLEAN NOT NULL DEFAULT true,
    "socials" TEXT
);
INSERT INTO "new_user" ("bio", "bioVi", "createdAt", "email", "emailVerified", "id", "image", "jobTitle", "name", "techStack", "updatedAt") SELECT "bio", "bioVi", "createdAt", "email", "emailVerified", "id", "image", "jobTitle", "name", "techStack", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
