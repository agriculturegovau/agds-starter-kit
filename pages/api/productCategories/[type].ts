// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ProductCategory, PrismaClient } from "@prisma/client";

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

  if (type !== "D" && type !== "H") {
    res.status(400).json({
      error: "Type query parameter not supported",
    });
    return;
  }

  const prisma = new PrismaClient();
  const packType = await prisma.packType.findMany({
    where: {
      value: {
        startsWith: type,
      },
    },
  });
  res.status(200).json(packType);
}
