import { Flex } from "@ag.ds-next/box";
import { Select } from "@ag.ds-next/select";
import { TextInput } from "@ag.ds-next/text-input";
import { UnitOfMeasure } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

type MeasureAmountUnitProps = {
  amount: number;
  unitOfMeasure?: UnitOfMeasure;
  amountLabel: string;
  unitLabel: string;
  onChange: (amount: number, unit?: UnitOfMeasure) => void;
};

export const MeasureAmountUnit = ({
  amount,
  amountLabel,
  onChange,
  unitLabel,
  unitOfMeasure,
}: MeasureAmountUnitProps) => {
  const [unitOfMeasures, setUnitOfMeasures] = useState<UnitOfMeasure[]>([]);

  useEffect(() => {
    axios.get<UnitOfMeasure[]>("/api/unitOfMeasure").then(({ data }) => {
      setUnitOfMeasures(data);
    });
  }, []);
  return (
    <Flex>
      <TextInput
        label={amountLabel}
        value={amount}
        type="number"
        onChange={(e) => {
          onChange(Number(e.target.value), unitOfMeasure);
        }}
      />

      <Select
        block
        label={unitLabel}
        required
        placeholder=" "
        value={unitOfMeasure?.value}
        onChange={(e) => {
          const newUnit = unitOfMeasures.find(
            (uom) => uom.value === e.target.value
          );
          onChange(amount, newUnit);
        }}
        options={unitOfMeasures.map((uom) => ({
          label: uom.label,
          value: uom.value,
        }))}
      />
    </Flex>
  );
};
