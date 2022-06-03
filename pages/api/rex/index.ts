// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Rex, PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Rex[] | Rex>
) {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

  const prisma = new PrismaClient();

  switch (req.method) {
    case "GET":
      const rexs = await prisma.rex.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          exportCountry: true,
          products: true,
        },
        take: limit,
      });
      res.status(200).json(rexs);
      return;
    case "POST":
      const rexNumber = `REX000${Math.floor(Math.random() * 9000) + 999}`;
      const { dairyOptions, countryId, ...rest } = req.body;
      const rex = await prisma.rex.create({
        data: {
          rexNumber,
          ...rest,
          ...(dairyOptions
            ? {
                dairyOptions: {
                  create: {
                    ...dairyOptions,
                  },
                },
              }
            : {}),
          ...(countryId
            ? {
                exportCountry: {
                  connect: {
                    id: countryId,
                  },
                },
              }
            : {}),
        },
        include: {
          exportCountry: true,
          products: true,
          certificate: true,
          dairyOptions: true,
          history: true,
        },
      });
      res.status(201).json(rex);
      return;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      return;
  }
}
