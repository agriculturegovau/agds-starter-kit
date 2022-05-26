// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Country, PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Country[]>
) {
  const prisma = new PrismaClient();
  const countries = await prisma.country.findMany();
  res.status(200).json(countries);
}
