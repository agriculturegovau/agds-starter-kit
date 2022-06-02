import { Box } from "@ag.ds-next/box";
import { Select } from "@ag.ds-next/select";
import { CommodityTypes } from "@prisma/client";
import { useEffect, useState } from "react";
import { RexFormProps } from "./rexForm";
import { Button } from "@ag.ds-next/button";
import { Heading } from "@ag.ds-next/heading";

export const CommodityForm = ({ currentRex, onComplete }: RexFormProps<{}>) => {
  const [commodityList, setCommodityList] = useState<CommodityTypes[]>([
    "DAIRY",
    "HONEY",
  ]);
  console.log(currentRex);
  const [selectedCommodity, setSelectedCommodity] = useState<
    CommodityTypes | undefined
  >(currentRex.commodityType);

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (processing && selectedCommodity !== undefined) {
      onComplete({
        commodityType: selectedCommodity,
      });
    }
  }, [processing]);

  return (
    <>
      <Heading as="h2" fontSize="xxl">
        Commodity to export
      </Heading>
      <Box paddingTop={2}>
        <Select
          label="Commodity type you wish to export to"
          required
          placeholder=" "
          value={selectedCommodity}
          onChange={(e) => {
            const newCommodity = commodityList.find(
              (commodity) => commodity === e.target.value
            );
            setSelectedCommodity(newCommodity);
          }}
          options={commodityList.map((commodity) => ({
            label: commodity,
            value: commodity,
          }))}
        />
      </Box>

      <Box paddingTop={2}>
        <Button
          onClick={() => {
            setProcessing(true);
          }}
          loading={processing}
          disabled={selectedCommodity === undefined}
        >
          Next
        </Button>
      </Box>
    </>
  );
};
