import {
  Rex,
  Product,
  DairyOptions,
  Certificate,
  History,
  Country,
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
  certificate?: Partial<Certificate>;
  dairyOptions?: Partial<DairyOptions>;
  exportCountry?: Partial<Country>;
  history: Partial<History>[];
  products: Partial<Product>[];
};

type NonNullableParams<T> = { [P in keyof T]: NonNullable<T[P]> };
