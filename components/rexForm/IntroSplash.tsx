import { Columns, Column } from "@ag.ds-next/columns";
import { Text } from "@ag.ds-next/text";
import Link from "next/link";
import { useEffect } from "react";
import { RexFormProps } from "./rexForm";

export const IntroSplash = () => {
  return (
    <Columns>
      <Column columnSpan={7}>
        <Text>
          Apply here to generate export documents. This includes export permits
          and certificates and related documents as required by importing
          countries. Refer to the Department of Agriculture, Water and the
          Environment's{" "}
          <Link href="https://www.awe.gov.au/biosecurity-trade/export/from-australia">
            Exporting from Australia
          </Link>{" "}
          page for more information about export documentation.
        </Text>
      </Column>
    </Columns>
  );
};
