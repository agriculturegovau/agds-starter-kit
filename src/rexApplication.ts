import {
  Rex,
  Product,
  DairyOptions,
  Certificate,
  History,
  Country,
  ProductItem,
  ProductCategory,
  PackType,
  Ahecc,
} from "@prisma/client";

export type RexApplication = Omit<
  Rex,
  "certificateId" | "dairyOptionsId" | "updatedAt" | "createdAt"
> & {
  certificate?: Certificate;
  dairyOptions?: DairyOptions;
  products: Product[];
};

export type RexProductApiResponse = Partial<Product> & {
  productItem: ProductItem;
  category: ProductCategory;
  packedIn: PackType;
  ahecc: Ahecc;
};

export type RexApiResponse = NonNullableParams<Rex> & {
  certificate?: Partial<Certificate>;
  dairyOptions?: Partial<DairyOptions>;
  exportCountry?: Partial<Country>;
  history: Partial<History>[];
  products: RexProductApiResponse[];
};

type NonNullableParams<T> = { [P in keyof T]: NonNullable<T[P]> };
