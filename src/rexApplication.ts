import {
  Rex,
  Product,
  DairyOptions,
  Certificate,
  History,
} from "@prisma/client";

export type RexApplication = Omit<
  Rex,
  "certificateId" | "dairyOptionsId" | "updatedAt" | "createdAt"
> & {
  certificate?: Certificate;
  dairyOptions?: DairyOptions;
  products: Product[];
};

export type RexApiResponse = Rex & {
  certificate?: Certificate;
  dairyOptions?: DairyOptions;
  history: History[];
  products: Product[];
};
