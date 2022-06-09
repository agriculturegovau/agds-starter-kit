-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "grossWeight" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "grossWeightUnitId" INTEGER,
ADD COLUMN     "individualPackageWeight" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "individualPackageWeightUnitId" INTEGER,
ADD COLUMN     "netWeight" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "netWeightUnitId" INTEGER,
ADD COLUMN     "outerPackagingId" INTEGER,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shippingMarks" TEXT NOT NULL DEFAULT E'';

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_outerPackagingId_fkey" FOREIGN KEY ("outerPackagingId") REFERENCES "PackType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_netWeightUnitId_fkey" FOREIGN KEY ("netWeightUnitId") REFERENCES "UnitOfMeasure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_grossWeightUnitId_fkey" FOREIGN KEY ("grossWeightUnitId") REFERENCES "UnitOfMeasure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_individualPackageWeightUnitId_fkey" FOREIGN KEY ("individualPackageWeightUnitId") REFERENCES "UnitOfMeasure"("id") ON DELETE SET NULL ON UPDATE CASCADE;
