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

export type RexApiResponse = NonNullableParams<Rex> & {
  certificate?: Certificate;
  dairyOptions?: DairyOptions;
  history: History[];
  products: Product[];
};

type NonNullableParams<T> = { [P in keyof T]: NonNullable<T[P]> };
