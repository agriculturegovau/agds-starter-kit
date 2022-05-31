import {
  Rex,
  Product,
  DairyOptions,
  Certificate,
  RexStatus,
} from "@prisma/client";

export type RexApplication = Omit<
  Rex,
  "certificateId" | "dairyOptionsId" | "updatedAt" | "createdAt"
> & {
  products: Product[];
  dairyOptions?: DairyOptions;
  certificate?: Certificate;
};

export const createDefaultRexApplication = (): RexApplication => ({
  clientRef: "",
  commodityType: null,
  consignee: "",
  countryId: null,
  id: -1,
  rexNumber: "",
  rexStatus: RexStatus.DRAFT,
  products: [],
});
