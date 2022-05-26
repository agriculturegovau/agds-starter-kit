// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PackType, PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PackType[]>
) {
  const prisma = new PrismaClient();
  const packType = await prisma.packType.findMany();
  res.status(200).json(packType);
}
