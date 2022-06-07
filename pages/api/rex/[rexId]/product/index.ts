// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Rex, PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | Product[] | { error: String }>
) {
  const { rexId } = req.query;

  if (!rexId) {
    res.status(400).json({
      error: "Missing rexId query parameter",
    });
    return;
  }

  if (Array.isArray(rexId)) {
    res.status(400).json({
      error: "rexId query parameter must be a string",
    });
    return;
  }

  switch (req.method) {
    case "POST":
      const data: Omit<Product, "id" | "rexId"> = req.body;

      const product = await prisma.product.create({
        data: {
          Rex: {
            connect: {
              rexNumber: rexId,
            },
          },
          ahecc: {
            connect: {
              id: data.aheccId,
            },
          },
          category: {
            connect: {
              id: data.categoryId,
            },
          },
          packedIn: {
            connect: {
              id: data.packedInId,
            },
          },
          productItem: {
            connect: {
              id: data.productItemId,
            },
          },
        },
        include: {
          ahecc: true,
          category: true,
          packedIn: true,
          productItem: true,
        },
      });

      res.status(200).json(product);
      return;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      return;
  }
}
