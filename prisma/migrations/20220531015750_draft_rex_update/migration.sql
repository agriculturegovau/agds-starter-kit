-- DropForeignKey
ALTER TABLE "Rex" DROP CONSTRAINT "Rex_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Rex" DROP CONSTRAINT "Rex_dairyOptionsId_fkey";

-- AlterTable
ALTER TABLE "Rex" ALTER COLUMN "commodityType" DROP NOT NULL,
ALTER COLUMN "countryId" DROP NOT NULL,
ALTER COLUMN "clientRef" DROP NOT NULL,
ALTER COLUMN "consignee" DROP NOT NULL,
ALTER COLUMN "dairyOptionsId" DROP NOT NULL,
ALTER COLUMN "rexStatus" SET DEFAULT E'DRAFT';

-- AddForeignKey
ALTER TABLE "Rex" ADD CONSTRAINT "Rex_dairyOptionsId_fkey" FOREIGN KEY ("dairyOptionsId") REFERENCES "DairyOptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rex" ADD CONSTRAINT "Rex_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
