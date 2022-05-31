/*
  Warnings:

  - A unique constraint covering the columns `[dairyOptionsId]` on the table `Rex` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[certificateId]` on the table `Rex` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rex_dairyOptionsId_key" ON "Rex"("dairyOptionsId");

-- CreateIndex
CREATE UNIQUE INDEX "Rex_certificateId_key" ON "Rex"("certificateId");
