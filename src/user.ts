import { RexDetails } from "./rex";

export type Quota = {
  type: "Allocated" | "First come first serve (FCFS)";
  total: number;
  used: number;
  pending: number;
  product: string;
  destinationCountry: string;
};

export type UserData = {
  rexData: Array<RexDetails>;
  quotas: Array<Quota>;
};

export const dairyUser: UserData = {
  rexData: [
    {
      number: "REX0000310707",
      date: "11/03/2022",
      product: "Milk, fresh",
      destinationCountry: "United States",
      status: "DRAFT",
      certificate: "6756",
      departureDate: "14/03/2022",
      amount: 840,
    },
    {
      number: "REX000026285",
      date: "08/04/2022",
      product: "Milk, UHT",
      destinationCountry: "China",
      status: "REVIEW",
      certificate: "1206",
      departureDate: "11/04/2022",
      amount: 680,
    },
    {
      number: "REX0000310474",
      date: "14/02/2022",
      product: "Cream cheese",
      destinationCountry: "United Kingdom",
      status: "DRAFT",
      certificate: "2297",
      departureDate: "19/02/2022",
      amount: 763,
    },
    {
      number: "REX000081560",
      date: "15/04/2022",
      product: "Butter",
      destinationCountry: "United Kingdom",
      status: "DRAFT",
      certificate: "1627",
      departureDate: "23/04/2022",
      amount: 954,
    },
    {
      number: "REX0000748338",
      date: "04/02/2022",
      product: "Goat cheese",
      destinationCountry: "Korea",
      status: "REVIEW",
      certificate: "8845",
      departureDate: "12/02/2022",
      amount: 981,
    },
    {
      number: "REX0000892874",
      date: "13/04/2022",
      product: "Milk, fresh",
      destinationCountry: "Korea",
      status: "REVIEW",
      certificate: "7226",
      departureDate: "19/04/2022",
      amount: 913,
    },
    {
      number: "REX0000615248",
      date: "01/04/2022",
      product: "Cheddar cheese",
      destinationCountry: "Japan",
      status: "REVIEW",
      certificate: "5003",
      departureDate: "08/04/2022",
      amount: 948,
    },
    {
      number: "REX0000687120",
      date: "21/01/2022",
      product: "Cheddar cheese",
      destinationCountry: "United States",
      status: "DRAFT",
      certificate: "6301",
      departureDate: "28/01/2022",
      amount: 460,
    },
    {
      number: "REX0000879962",
      date: "09/03/2022",
      product: "Butter",
      destinationCountry: "China",
      status: "DRAFT",
      certificate: "9893",
      departureDate: "15/03/2022",
      amount: 753,
    },
    {
      number: "REX0000850928",
      date: "24/03/2022",
      product: "Milk, powdered",
      destinationCountry: "United Kingdom",
      status: "DRAFT",
      certificate: "3437",
      departureDate: "02/04/2022",
      amount: 400,
    },
    {
      number: "REX0000236021",
      date: "18/11/2021",
      product: "Milk, powdered",
      destinationCountry: "United Kingdom",
      status: "APPROVED",
      certificate: "1886",
      departureDate: "21/11/2021",
      amount: 910,
    },
    {
      number: "REX0000188714",
      date: "07/10/2021",
      product: "Goat cheese",
      destinationCountry: "United Kingdom",
      status: "APPROVED",
      certificate: "7548",
      departureDate: "17/10/2021",
      amount: 460,
    },
    {
      number: "REX0000756206",
      date: "26/08/2021",
      product: "Milk, fresh",
      destinationCountry: "United States",
      status: "APPROVED",
      certificate: "4509",
      departureDate: "04/09/2021",
      amount: 848,
    },
    {
      number: "REX0000441287",
      date: "03/10/2021",
      product: "Milk, fresh",
      destinationCountry: "Japan",
      status: "APPROVED",
      certificate: "7938",
      departureDate: "09/10/2021",
      amount: 500,
    },
    {
      number: "REX0000125309",
      date: "24/08/2021",
      product: "Milk, UHT",
      destinationCountry: "Korea",
      status: "APPROVED",
      certificate: "8110",
      departureDate: "29/08/2021",
      amount: 242,
    },
  ],
  quotas: [
    {
      destinationCountry: "United Kingdom",
      product: "Milk, powdered",
      type: "Allocated",
      total: 2000,
      used: 910,
      pending: 400,
    },
    {
      destinationCountry: "Japan",
      product: "Milk, fresh",
      type: "First come first serve (FCFS)",
      total: 4500,
      used: 1500,
      pending: 0,
    },
  ],
};
