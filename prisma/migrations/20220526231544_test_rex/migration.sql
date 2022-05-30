-- CreateEnum
CREATE TYPE "CommodityTypes" AS ENUM ('DAIRY', 'HONEY');

-- CreateTable
CREATE TABLE "Rex" (
    "id" TEXT NOT NULL,
    "commodityType" "CommodityTypes" NOT NULL,
    "usesQuota" BOOLEAN NOT NULL DEFAULT false,
    "usesImportedDairy" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "Rex_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rex" ADD CONSTRAINT "Rex_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
