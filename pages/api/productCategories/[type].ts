// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ProductCategory, CommodityTypes, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductCategory[] | { error: string }>
) {
  const { type } = req.query;

  if (!type) {
    res.status(400).json({
      error: "Missing type query parameter",
    });
    return;
  }

  if (Array.isArray(type)) {
    res.status(400).json({
      error: "Type query parameter must be a string",
    });
    return;
  }

  if (type !== CommodityTypes.DAIRY && type !== CommodityTypes.HONEY) {
    res.status(400).json({
      error: "Type query parameter not supported",
    });
    return;
  }

  const productCategory = await prisma.productCategory.findMany({
    where: {
      value: {
        startsWith: type === CommodityTypes.DAIRY ? "D" : "H",
      },
    },
  });
  res.status(200).json(productCategory);
}
