// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Ahecc, PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ahecc[]>
) {
  const prisma = new PrismaClient();
  const ahecc = await prisma.ahecc.findMany();
  res.status(200).json(ahecc);
}
