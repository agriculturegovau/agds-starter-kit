import { PrismaClient } from "@prisma/client";
import {
  ahecc,
  countries,
  dairyProducts,
  honeyProducts,
  packTypes,
  productCategories,
  unitOfMeasure,
} from "../src/seedData";
const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    seedDairyProducts(),
    seedPackTypes(),
    seedCountries(),
    seedAhecc(),
    seedProductCategories(),
    seedUnitOfMeasure(),
  ]);
}

async function seedDairyProducts() {
  dairyProducts.forEach(async ({ commodityType, id, label, value }) => {
    await prisma.productItem.create({
      data: {
        label,
        value,
        commodityType,
        productId: id,
      },
    });
  });

  honeyProducts.forEach(async ({ commodityType, id, label, value }) => {
    await prisma.productItem.create({
      data: {
        label,
        value,
        commodityType,
        productId: id,
      },
    });
  });
}

async function seedPackTypes() {
  packTypes.forEach(async ({ label, value }) => {
    await prisma.packType.create({
      data: {
        label,
        value,
      },
    });
  });
}

async function seedCountries() {
  countries.forEach(async ({ label, value }) => {
    await prisma.country.create({
      data: {
        label,
        value,
      },
    });
  });
}

async function seedAhecc() {
  ahecc.forEach(async ({ label, value }) => {
    await prisma.ahecc.create({
      data: {
        label,
        value,
      },
    });
  });
}

async function seedProductCategories() {
  productCategories.forEach(async ({ label, value }) => {
    await prisma.productCategory.create({
      data: {
        label,
        value,
      },
    });
  });
}

async function seedUnitOfMeasure() {
  unitOfMeasure.forEach(async ({ label, value }) => {
    await prisma.unitOfMeasure.create({
      data: {
        label,
        value,
      },
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
