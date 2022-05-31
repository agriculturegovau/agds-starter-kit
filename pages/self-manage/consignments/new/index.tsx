import { Body } from "@ag.ds-next/body";
import { Box, Flex } from "@ag.ds-next/box";
import { Breadcrumbs } from "@ag.ds-next/breadcrumbs";
import { Button } from "@ag.ds-next/button";
import { Content } from "@ag.ds-next/content";
import { ControlGroup, Checkbox } from "@ag.ds-next/control-input";
import { Heading } from "@ag.ds-next/heading";
import { Select } from "@ag.ds-next/select";
import { Text } from "@ag.ds-next/text";
import { AppLayout } from "@components/AppLayout";
import { DocumentTitle } from "@components/DocumentTitle";
import { CommodityTypes, Rex } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const NewConsignment = () => {
  const [selectedCommodity, setSelectedCommodity] = useState<CommodityTypes>();
  const [usesQuota, setUsesQuota] = useState(false);
  const [usesImportedDairy, setUsesImportedDairy] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading && selectedCommodity !== undefined) {
      axios
        .post<Rex>("/api/rex", {
          commodityType: selectedCommodity,
          ...(selectedCommodity === "DAIRY"
            ? {
                dairyOptions: {
                  usesQuota,
                  usesImportedDairy,
                },
              }
            : {}),
        })
        .then((res) => {
          //   TODO: go to main form page
        });
    }
  }, [loading]);
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
                  value={selectedCommodity}
                  onChange={(e) => {
                    //@ts-ignore
                    const newCommodity = e.target.value as CommodityTypes;
                    setSelectedCommodity(newCommodity);
                  }}
                  options={[
                    { label: "Dairy", value: CommodityTypes.DAIRY },
                    { label: "Honey", value: CommodityTypes.HONEY },
                  ]}
                />
              </Box>
              {selectedCommodity === "DAIRY" && (
                <Flex paddingTop={2} flexDirection="column">
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
                      onChange={() =>
                        setUsesImportedDairy((prevState) => !prevState)
                      }
                    >
                      The products in this application contain imported dairy
                      ingredients
                    </Checkbox>
                  </ControlGroup>
                </Flex>
              )}

              <Box paddingTop={2}>
                <Button
                  onClick={() => {
                    setLoading(true);
                  }}
                  loading={loading}
                  disabled={selectedCommodity === undefined || loading}
                >
                  Start
                </Button>
              </Box>
            </Box>
          </Body>
        </Content>
      </AppLayout>
    </>
  );
};

export default NewConsignment;
