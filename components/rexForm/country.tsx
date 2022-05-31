import { Box, Flex } from "@ag.ds-next/box";
import { Text } from "@ag.ds-next/text";
import { Select } from "@ag.ds-next/select";
import { Country, Rex } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RexFormProps } from "./rexForm";
import { Button } from "@ag.ds-next/button";
import axios from "axios";
import { ControlGroup, Checkbox } from "@ag.ds-next/control-input";
import { Heading } from "@ag.ds-next/heading";

type CountryProps = {};

export const CountryForm = ({ nextPage }: RexFormProps<CountryProps>) => {
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>();

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    axios.get<Country[]>("/api/countries").then((res) => {
      const { data } = res;
      setCountryList(data);
    });
  }, []);

  useEffect(() => {
    if (processing && selectedCountry !== undefined) {
      axios
        .patch<Rex>("/api/rex/", {
          countryId: selectedCountry.id,
        })
        .then((res) => {
          console.log(res);
          nextPage();
        });
    }
  }, [processing]);

  return (
    <>
      <Heading as="h2" fontSize="xxl">
        Country to export
      </Heading>
      <Box paddingTop={2}>
        <Select
          label="Country you wish to export to"
          required
          placeholder=" "
          value={selectedCountry?.id}
          onChange={(e) => {
            //@ts-ignore
            const newCommodity = countryList.find(
              (country) => country.id === Number.parseInt(e.target.value)
            );
            setSelectedCountry(newCommodity);
          }}
          options={countryList.map((country) => ({
            label: country.label,
            value: country.id.toString(),
          }))}
        />
      </Box>

      <Box paddingTop={2}>
        <Button
          onClick={() => {
            setProcessing(true);
          }}
          disabled={selectedCountry === undefined}
        >
          Next
        </Button>
      </Box>
    </>
  );
};
