export type SupportedCommodities = "dairy" | "honey";

export type RexApplication = {
  commodity: SupportedCommodities;
  usesQuota: boolean;
  usesImportedDairy: boolean;
  exportCountryValue: string;
  
};
