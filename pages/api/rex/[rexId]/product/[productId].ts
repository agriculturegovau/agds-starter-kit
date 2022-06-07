// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Rex, PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | Product[] | { error: String }>
) {
  const { rexId, productId } = req.query;

  if (!rexId) {
    res.status(400).json({
      error: "Missing rexId query parameter",
    });
    return;
  }

  if (!productId) {
    res.status(400).json({
      error: "Missing productId query parameter",
    });
    return;
  }

  if (Array.isArray(rexId)) {
    res.status(400).json({
      error: "rexId query parameter must be a string",
    });
    return;
  }

  if (Array.isArray(productId)) {
    res.status(400).json({
      error: "productId query parameter must be a string",
    });
    return;
  }

  switch (req.method) {
    case "PATCH":
      const data: Omit<Product, "id" | "rexId"> = req.body;

      const product = await prisma.product.update({
        where: {
          id: Number.parseInt(productId),
        },
        data: {
          ...data,
        },
        include: {
          ahecc: true,
          category: true,
          packedIn: true,
          productItem: true,
        },
      });

      res.status(200).json(product);
    default:
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      return;
  }
}
