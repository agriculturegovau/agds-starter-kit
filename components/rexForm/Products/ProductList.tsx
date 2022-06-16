import { Box, Flex } from "@ag.ds-next/box";
import { Button } from "@ag.ds-next/button";
import { Heading } from "@ag.ds-next/heading";
import { PageAlert } from "@ag.ds-next/page-alert";
import { Text, TextLink } from "@ag.ds-next/text";
import styled from "@emotion/styled";
import { RexApiResponse, RexProductApiResponse } from "src/rexApplication";

type ProductListFormProps = {
  currentRex: Partial<RexApiResponse>;
  onSelect: (product: RexProductApiResponse) => void;
  onCreateNewProduct: () => void;
  justGenerated: boolean;
};

const ProductBox = styled(Box)(() => ({
  border: "1px solid #6F777B",
}));

export const ProductListForm = ({
  onCreateNewProduct,
  currentRex,
  onSelect,
  justGenerated,
}: ProductListFormProps) => {
  return (
    <>
      {justGenerated && (
        <PageAlert tone="success" title="Application generated">
          <Text as="p">{`Application Number ${currentRex.rexNumber}`}</Text>
        </PageAlert>
      )}

      <Heading as="h2" fontSize="xxl">
        Products for export
      </Heading>
      <Box paddingTop={2}>
        <Text as="p">
          Search for the product you wish to export. If you cannot find your
          product in the list please{" "}
          <TextLink href="#">contact the Department</TextLink>.
        </Text>
      </Box>

      <Box paddingTop={1}>
        {currentRex.products &&
          currentRex.products.length > 0 &&
          currentRex.products.map((product, i) => {
            return (
              <ProductBox rounded key={product.id} padding={1}>
                <Flex
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text fontSize="md">{`${i + 1}. ${
                    product.productItem.label
                  }`}</Text>
                  <Button
                    variant="tertiary"
                    onClick={() => {
                      onSelect(product);
                    }}
                  >
                    Edit
                  </Button>
                </Flex>
              </ProductBox>
            );
          })}
      </Box>
      <Box paddingTop={1}>
        <Button
          variant="secondary"
          onClick={() => {
            onCreateNewProduct();
          }}
        >
          Add another product +
        </Button>
      </Box>
    </>
  );
};
