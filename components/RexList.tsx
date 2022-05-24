import { Box, Flex } from "@ag.ds-next/box";
import { Columns, Column } from "@ag.ds-next/columns";
import { Select } from "@ag.ds-next/select";
import { Text } from "@ag.ds-next/text";
import styled from "@emotion/styled";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RexDetails, RexStatus, rexStatuses } from "src/rex";
import { RexTag } from "./RexTag";
import { dairyUser } from "src/user";
import { Button } from "@ag.ds-next/button";

const ShadowBox = styled(Box)(() => ({
  // backgroundColor: "#FFF",
  filter: "drop-shadow(1px 4px 15px rgba(0, 0, 0, 0.1))",
}));

const FakeLinkText = styled(Text)(() => ({
  textDecoration: "underline",
  cursor: "pointer",
}));

type RexListProps = {
  rexDetails: RexDetails[];
};

const commodities = dairyUser.rexData.reduce((pv, cv) => {
  if (!pv.includes(cv.product)) {
    pv.push(cv.product);
  }
  return pv;
}, [] as Array<string>);

const countries = dairyUser.rexData.reduce((pv, cv) => {
  if (!pv.includes(cv.destinationCountry)) {
    pv.push(cv.destinationCountry);
  }
  return pv;
}, [] as Array<string>);

export const RexList = ({ rexDetails }: RexListProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<RexStatus[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [numPerPage, setNumPerPage] = useState(10);

  const [filteredPagedRexDetails, setFilteredPagedRexDetails] = useState<
    Array<RexDetails[]>
  >([rexDetails]);

  useEffect(() => {
    const filteredRexDetails = rexDetails.filter((rex) => {
      const productMatch =
        selectedProducts.length === 0 || selectedProducts.includes(rex.product);
      const countryMatch =
        selectedCountries.length === 0 ||
        selectedCountries.includes(rex.destinationCountry);
      const statusMatch =
        selectedStatuses.length === 0 || selectedStatuses.includes(rex.status);

      return productMatch && countryMatch && statusMatch;
    });

    const pagedRexDetails = [];
    for (let i = 0; i < filteredRexDetails.length; i += numPerPage) {
      pagedRexDetails.push(filteredRexDetails.slice(i, i + numPerPage));
    }
    setCurrentPage(1);

    setFilteredPagedRexDetails(pagedRexDetails);
  }, [selectedProducts, selectedCountries, selectedStatuses, numPerPage]);

  return (
    <>
      <Button
        variant={showFilters ? "secondary" : "primary"}
        onClick={() => {
          setShowFilters(!showFilters);
        }}
      >
        {`${showFilters ? "Hide " : "Show "}Filters`}
      </Button>
      {showFilters && (
        <Flex flexDirection="row" paddingY={4}>
          <Box paddingRight={2}>
            <Select
              label="Commodity Type"
              options={[
                { label: "none", value: "" },
                ...commodities.map((commodity) => ({
                  label: commodity,
                  value: commodity,
                })),
              ]}
              onChange={({ target: { value } }) => {
                if (value !== "") {
                  setSelectedProducts([value]);
                } else {
                  setSelectedProducts([]);
                }
              }}
            />
          </Box>
          <Box paddingRight={2}>
            <Select
              label="Arrival Country"
              options={[
                { label: "none", value: "" },
                ...countries.map((country) => ({
                  label: country,
                  value: country,
                })),
              ]}
              onChange={({ target: { value } }) => {
                if (value !== "") {
                  setSelectedCountries([value]);
                } else {
                  setSelectedCountries([]);
                }
              }}
            />
          </Box>
          <Box paddingRight={2}>
            <Select
              label="Status"
              options={[
                { label: "none", value: "" },
                ...rexStatuses.map((rexStatus) => ({
                  label: rexStatus,
                  value: rexStatus,
                })),
              ]}
              onChange={({ target: { value } }) => {
                if (value !== "") {
                  //@ts-ignore
                  setSelectedStatuses([value]);
                } else {
                  setSelectedStatuses([]);
                }
              }}
            />
          </Box>
        </Flex>
      )}
      <hr />
      <ShadowBox paddingY={4}>
        <Box
          background={"shade"}
          paddingX={1.5}
          paddingY={1}
          style={{ borderRadius: "4px 4px 0px 0px" }}
        >
          <Columns columnGap={0.5}>
            <Column columnSpan={2}>
              <Box fontWeight="bold">Application Number</Box>
            </Column>
            <Column columnSpan={2}>
              <Box fontWeight="bold">Client Reference</Box>
            </Column>
            <Column columnSpan={2}>
              <Box fontWeight="bold">Created On</Box>
            </Column>
            <Column columnSpan={2}>
              <Box fontWeight="bold">Product</Box>
            </Column>
            <Column columnSpan={1}>
              <Box fontWeight="bold">Exporting to</Box>
            </Column>
            <Column columnSpan={2}>
              <Box fontWeight="bold">Consignee</Box>
            </Column>
            <Column columnSpan={1}>
              <Box fontWeight="bold">Status</Box>
            </Column>
          </Columns>
        </Box>
        {filteredPagedRexDetails[currentPage - 1].map((rex) => {
          const Tag = RexTag(rex.status);
          return (
            <Box
              key={rex.number}
              paddingY={1.5}
              paddingX={1.5}
              border
              borderWidth="sm"
              style={{ borderColor: "#E0E0E0", backgroundColor: "#FFF" }}
            >
              <Columns columnGap={0.5}>
                <Column columnSpan={2}>
                  <Box>
                    <Link href={`self-manage/consignments/${rex.number}`}>
                      {rex.number}
                    </Link>
                  </Box>
                </Column>
                <Column columnSpan={2}>
                  <Box>ABC1234567</Box>
                </Column>
                <Column columnSpan={2}>
                  <Box>{rex.date}</Box>
                  <Box>
                    <Text fontSize="xs" color="muted">
                      Updated 5 days ago
                    </Text>
                  </Box>
                </Column>
                <Column columnSpan={2}>
                  <Box>{rex.product}</Box>
                </Column>
                <Column columnSpan={1}>
                  <Box>{rex.destinationCountry}</Box>
                </Column>
                <Column columnSpan={2}>
                  <Box>{rex.number}</Box>
                </Column>
                <Column columnSpan={1}>
                  <Tag />
                </Column>
              </Columns>
            </Box>
          );
        })}
        <Box
          background={"shade"}
          paddingX={1.5}
          paddingY={1}
          style={{ borderRadius: "4px 4px 0px 0px" }}
        >
          <Columns>
            <Column columnSpan={3}></Column>
            <Column columnSpan={6}>
              {filteredPagedRexDetails.length > 1 && (
                <Flex justifyContent="space-around">
                  <Button
                    variant="tertiary"
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                    }}
                  >
                    Previous
                  </Button>
                  {filteredPagedRexDetails.length > 1 &&
                    filteredPagedRexDetails.map((_, i) => (
                      <Button
                        variant="tertiary"
                        disabled={currentPage === i + 1}
                        onClick={() => {
                          setCurrentPage(i + 1);
                        }}
                        key={i}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  <Button
                    variant="tertiary"
                    disabled={currentPage === filteredPagedRexDetails.length}
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                    }}
                  >
                    Next
                  </Button>
                </Flex>
              )}
            </Column>
            <Column
              columnSpan={3}
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                textAlign: "right",
              }}
            >
              <Text>Items Per Page</Text>
              <select
                style={{ marginLeft: "4px" }}
                value={`${numPerPage}`}
                onChange={({ target: { value } }) => {
                  setNumPerPage(parseInt(value));
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </Column>
          </Columns>
        </Box>
      </ShadowBox>
    </>
  );
};
