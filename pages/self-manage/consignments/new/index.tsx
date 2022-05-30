import { Body } from "@ag.ds-next/body";
import { Box, Flex } from "@ag.ds-next/box";
import { Breadcrumbs } from "@ag.ds-next/breadcrumbs";
import { Button } from "@ag.ds-next/button";
import { Checkbox, ControlGroup } from "@ag.ds-next/control-input";
import { Content } from "@ag.ds-next/content";
import { Heading } from "@ag.ds-next/heading";
import { Select } from "@ag.ds-next/select";
import { Text } from "@ag.ds-next/text";
import { AppLayout } from "@components/AppLayout";
import { DocumentTitle } from "@components/DocumentTitle";
import Link from "next/link";
import { useState } from "react";
import { SupportedCommodities } from "src/rexApplication";


type RexFormFields = {
  commodity: SupportedCommodities | "";
  usesQuota: boolean;
  usesImportedDairy: boolean;
};

const initRexFormFields: RexFormFields = {
  commodity: "dairy",
  usesQuota: false,
  usesImportedDairy: false,
};

const NewConsignment = () => {
  const [form, setForm] = useState(initRexFormFields);

  const updateForm =
    (field: keyof RexFormFields) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: event.target.checked });
    };

  return (
    <>
      <DocumentTitle title="Home" />
      <AppLayout navHrefOverride="/">
        <Content>
          <Body>
            <Breadcrumbs
              links={[
                { href: "/", label: "Home" },
                { href: "/self-manage", label: "Consignments" },
                { label: "Apply for export documentation" },
              ]}
            />
            <Box paddingTop={2}>
              <Heading as="h2" fontSize="xxl">
                Apply for export documentation
              </Heading>
            </Box>

            <Box paddingY={4}>
              <Text>
                Apply here to generate export documents. This includes export
                permits and certificates and related documents as required by
                importing countries. Refer to the Department of Agriculture,
                Water and the Environment's{" "}
                <Link href="https://www.awe.gov.au/biosecurity-trade/export/from-australia">
                  Exporting from Australia
                </Link>{" "}
                page for more information about export documentation.
              </Text>
              <Box paddingTop={2}>
                <Select
                  label="Commodity type of your export"
                  required
                  placeholder=" "
                  value={form.commodity}
                  onChange={(e) =>
                    setForm((prevState) => {
                      //@ts-ignore
                      const newCommodity = e.target
                        .value as SupportedCommodities;
                      return {
                        ...prevState,
                        commodity: newCommodity,
                      };
                    })
                  }
                  options={[
                    { label: "Dairy", value: "dairy" },
                    { label: "Honey", value: "honey" },
                  ]}
                />
              </Box>
              {form.commodity === "dairy" && (
                <Flex paddingTop={2} flexDirection="column">
                  <Text fontWeight="bold">Select all that apply</Text>
                  <ControlGroup block>
                    <Checkbox
                      checked={form.usesQuota}
                      onChange={() =>
                        setForm((prevState) => ({
                          ...prevState,
                          usesQuota: !prevState.usesQuota,
                        }))
                      }
                    >
                      Quota applies to this application
                    </Checkbox>
                    <Checkbox
                      checked={form.usesImportedDairy}
                      onChange={() =>
                        setForm((prevState) => ({
                          ...prevState,
                          usesImportedDairy: !prevState.usesImportedDairy,
                        }))
                      }
                    >
                      The products in this application contain imported dairy
                      ingredients
                    </Checkbox>
                  </ControlGroup>
                </Flex>
              )}
              <Box paddingTop={2}>
                <Button disabled={form.commodity === ""}>Start</Button>
              </Box>
            </Box>  
          </Body>
        </Content>
      </AppLayout>
    </>
  );
};

export default NewConsignment;
