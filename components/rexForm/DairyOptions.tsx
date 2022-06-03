import { Box } from "@ag.ds-next/box";
import { Text } from "@ag.ds-next/text";
import { useEffect, useState } from "react";
import { RexFormProps } from "./rexForm";
import { Button } from "@ag.ds-next/button";
import { Heading } from "@ag.ds-next/heading";
import { ControlGroup, Checkbox } from "@ag.ds-next/control-input";

export const DairyOptionsForm = ({
  currentRex,
  onComplete,
}: RexFormProps<{}>) => {
  const [usesQuota, setUsesQuota] = useState(false);
  const [usesImportedDairy, setUsesImportedDairy] = useState(false);

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (processing) {
      onComplete({
        dairyOptions: {
          usesQuota,
          usesImportedDairy,
        },
      });
    }
  }, [processing]);

  return (
    <>
      <Heading as="h2" fontSize="xxl">
        Dairy Options
      </Heading>
      <Box paddingTop={2}>
        <Text fontWeight="bold">Select all that apply</Text>
        <ControlGroup block>
          <Checkbox
            checked={usesQuota}
            onChange={() => setUsesQuota((prevState) => !prevState)}
          >
            Quota applies to this application
          </Checkbox>
          <Checkbox
            checked={usesImportedDairy}
            onChange={() => setUsesImportedDairy((prevState) => !prevState)}
          >
            The products in this application contain imported dairy ingredients
          </Checkbox>
        </ControlGroup>
      </Box>

      <Box paddingTop={2}>
        <Button
          onClick={() => {
            setProcessing(true);
          }}
          loading={processing}
        >
          Next
        </Button>
      </Box>
    </>
  );
};
