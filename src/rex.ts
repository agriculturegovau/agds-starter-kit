import { addDays, format } from "date-fns";

export type RexStatus = "REVIEW" | "DRAFT" | "APPROVED";
export const rexStatuses: Array<RexStatus> = ["REVIEW", "DRAFT", "APPROVED"];

export type RexDetails = {
  number: string;
  date: string;
  product: string;
  destinationCountry: string;
  status: RexStatus;
  certificate: string;
  departureDate: string;
  amount: number;
};

const dairyTypes = [
  "Cheddar cheese",
  "Cream cheese",
  "Goat cheese",
  "Mozzarella cheese",
  "Parmesan cheese",
  "Milk, fresh",
  "Milk, fresh, low fat",
  "Milk, powdered",
  "Milk, powdered, low fat",
  "Milk, UHT",
  "Milk, UHT, low fat",
  "Ice Cream",
  "Ice Cream, low fat",
  "Butter",
];

const exportingCountries = [
  "China",
  "France",
  "Germany",
  "Italy",
  "Japan",
  "Korea",
  "United Kingdom",
  "United States",
];

export const generateRexDetails = (historical: boolean = false): RexDetails => {
  const baseDate = addDays(
    new Date(),
    -Math.floor(Math.random() * 100) - (historical ? 150 : 0)
  );
  const date = format(baseDate, "dd/MM/yyyy");
  const departureDate = format(
    addDays(baseDate, Math.floor(Math.random() * 10) + 3),
    "dd/MM/yyyy"
  );
  return {
    number: `REX0000${Math.floor(Math.random() * 1000000)}`,
    date,
    product: dairyTypes[Math.floor(Math.random() * dairyTypes.length)],
    destinationCountry:
      exportingCountries[Math.floor(Math.random() * exportingCountries.length)],
    status: historical ? "APPROVED" : Math.random() > 0.5 ? "REVIEW" : "DRAFT",
    certificate: `${Math.floor(Math.random() * 9000) + 1000}`,
    departureDate,
    amount: Math.floor(Math.random() * 900) + 100,
  };
};
