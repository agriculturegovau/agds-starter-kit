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
import { RexApiResponse } from "src/rexApplication";

export const CountryForm = ({ onComplete, currentRex }: RexFormProps<{}>) => {
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>();

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    axios.get<Country[]>("/api/countries").then((res) => {
      const { data } = res;
      setCountryList(data);
      if (currentRex.countryId) {
        setSelectedCountry(data.find((c) => c.id === currentRex.countryId));
      }
    });
  }, []);

  useEffect(() => {
    if (processing && selectedCountry !== undefined) {
      if (currentRex.rexNumber) {
        axios
          .patch<RexApiResponse>(`/api/rex/${currentRex.rexNumber}`, {
            countryId: selectedCountry.id,
          })
          .then((res) => {
            onComplete(res.data);
          });
      } else {
        onComplete({ countryId: selectedCountry.id });
      }
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
          loading={processing}
          disabled={selectedCountry === undefined}
        >
          Next
        </Button>
      </Box>
    </>
  );
};
