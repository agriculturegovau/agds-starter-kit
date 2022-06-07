import { Box } from "@ag.ds-next/box";
import { Button } from "@ag.ds-next/button";
import { useState } from "react";
import { RexApiResponse, RexProductApiResponse } from "src/rexApplication";
import { RexFormProps } from "../rexForm";
import { ProductListForm } from "./ProductList";
import { SingleProductForm } from "./SingleProduct";

type ProductFormState = "list" | "single";

export const ProductForm = ({ onUpdate, currentRex }: RexFormProps<{}>) => {
  const [formState, setFormState] = useState<ProductFormState>(
    currentRex.rexNumber ? "list" : "single"
  );
  const [selectedProduct, setSelectedProduct] =
    useState<RexProductApiResponse>();
  const [rexJustCreated, setRexJustCreated] = useState(false);

  const handleUpdate = (rex: Partial<RexApiResponse>) => {
    console.log({ rex });
    setRexJustCreated(rex.products?.length === 1);
    onUpdate(rex);
    setFormState("list");
  };

  switch (formState) {
    case "list":
      return (
        <>
          <ProductListForm
            currentRex={currentRex}
            onSelect={(product) => {
              // setSelectedProduct(product);
              setFormState("single");
            }}
            justGenerated={rexJustCreated}
          />

          <Box paddingTop={2}>
            <Button
              onClick={() => {
                console.log(currentRex);
                // setProcessing(true);
              }}
              disabled={
                currentRex.products ? currentRex.products.length === 0 : true
              }
            >
              Next
            </Button>
          </Box>
        </>
      );
    case "single":
      return (
        <SingleProductForm
          onUpdate={handleUpdate}
          currentRex={currentRex}
          currentProduct={selectedProduct}
        />
      );
  }
};
