/*
  Warnings:

  - The primary key for the `Rex` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `usesImportedDairy` on the `Rex` table. All the data in the column will be lost.
  - You are about to drop the column `usesQuota` on the `Rex` table. All the data in the column will be lost.
  - The `id` column on the `Rex` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `DairyProduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[rexNumber]` on the table `Rex` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientRef` to the `Rex` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consignee` to the `Rex` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dairyOptionsId` to the `Rex` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rexNumber` to the `Rex` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rexStatus` to the `Rex` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RexStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'ON_HOLD', 'READY_TO_PRINT');

-- CreateEnum
CREATE TYPE "CertificateStatus" AS ENUM ('DRAFT', 'COMPLETE');

-- AlterTable
ALTER TABLE "Rex" DROP CONSTRAINT "Rex_pkey",
DROP COLUMN "usesImportedDairy",
DROP COLUMN "usesQuota",
ADD COLUMN     "certificateId" INTEGER,
ADD COLUMN     "clientRef" TEXT NOT NULL,
ADD COLUMN     "consignee" TEXT NOT NULL,
ADD COLUMN     "dairyOptionsId" INTEGER NOT NULL,
ADD COLUMN     "rexNumber" TEXT NOT NULL,
ADD COLUMN     "rexStatus" "RexStatus" NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Rex_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "DairyProduct";

-- CreateTable
CREATE TABLE "DairyOptions" (
    "id" SERIAL NOT NULL,
    "usesQuota" BOOLEAN NOT NULL DEFAULT false,
    "usesImportedDairy" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DairyOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "productItemId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "packedInId" INTEGER NOT NULL,
    "aheccId" INTEGER NOT NULL,
    "rexId" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" SERIAL NOT NULL,
    "certificateNumber" TEXT NOT NULL,
    "dateIssued" TIMESTAMP(3) NOT NULL,
    "placeIssued" TEXT NOT NULL,
    "status" "CertificateStatus" NOT NULL,
    "consigneeName" TEXT NOT NULL,
    "consigneeAddress" TEXT NOT NULL,
    "exporterName" TEXT NOT NULL,
    "exporterAddress" TEXT NOT NULL,
    "dateOfDeparture" TIMESTAMP(3) NOT NULL,
    "portOfLoading" TEXT NOT NULL,
    "portOfDischarge" TEXT NOT NULL,
    "declaration" TEXT NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "rexStatus" "RexStatus" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "rexId" INTEGER,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductItem" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "commodityType" "CommodityTypes" NOT NULL,

    CONSTRAINT "ProductItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductItem_productId_key" ON "ProductItem"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Rex_rexNumber_key" ON "Rex"("rexNumber");

-- AddForeignKey
ALTER TABLE "Rex" ADD CONSTRAINT "Rex_dairyOptionsId_fkey" FOREIGN KEY ("dairyOptionsId") REFERENCES "DairyOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rex" ADD CONSTRAINT "Rex_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_rexId_fkey" FOREIGN KEY ("rexId") REFERENCES "Rex"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_aheccId_fkey" FOREIGN KEY ("aheccId") REFERENCES "Ahecc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_packedInId_fkey" FOREIGN KEY ("packedInId") REFERENCES "PackType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productItemId_fkey" FOREIGN KEY ("productItemId") REFERENCES "ProductItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_rexId_fkey" FOREIGN KEY ("rexId") REFERENCES "Rex"("id") ON DELETE SET NULL ON UPDATE CASCADE;
