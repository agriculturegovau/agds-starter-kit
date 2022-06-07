// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Ahecc, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ahecc[]>
) {
  const ahecc = await prisma.ahecc.findMany();
  res.status(200).json(ahecc);
}
