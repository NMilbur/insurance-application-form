/*
  Warnings:

  - A unique constraint covering the columns `[applicationReference]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Application_applicationReference_key" ON "Application"("applicationReference");
