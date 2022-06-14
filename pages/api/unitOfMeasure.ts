// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { UnitOfMeasure, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UnitOfMeasure[]>
) {
  const unitOfMeasure = await prisma.unitOfMeasure.findMany();
  res.status(200).json(unitOfMeasure);
}
