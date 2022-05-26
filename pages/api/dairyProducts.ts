// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { DairyProduct, PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DairyProduct[]>
) {
  const prisma = new PrismaClient();
  const dairyProducts = await prisma.dairyProduct.findMany();
  res.status(200).json(dairyProducts);
}
