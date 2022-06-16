import { Box, Flex } from "@ag.ds-next/box";
import { Button } from "@ag.ds-next/button";
import { useState } from "react";
import { RexApiResponse, RexProductApiResponse } from "src/rexApplication";
import { NextAndExit } from "../NextAndExit";
import { RexFormProps } from "../rexForm";
import { ProductListForm } from "./ProductList";
import { SingleProductForm } from "./SingleProduct";

type ProductFormState = "list" | "single";

export const ProductForm = ({
  onComplete,
  onUpdate,
  currentRex,
  onExit,
}: RexFormProps<{}>) => {
  const [formState, setFormState] = useState<ProductFormState>(
    currentRex.rexNumber ? "list" : "single"
  );
  const [selectedProduct, setSelectedProduct] =
    useState<RexProductApiResponse>();
  const [rexJustCreated, setRexJustCreated] = useState(false);

  const handleUpdate = (rex: Partial<RexApiResponse>) => {
    setRexJustCreated(rex.products?.length === 1);
    onUpdate(rex);
    setFormState("list");
  };

  switch (formState) {
    case "list":
      return (
        <>
          <ProductListForm
            onCreateNewProduct={() => {
              setSelectedProduct(undefined);
              setFormState("single");
            }}
            currentRex={currentRex}
            onSelect={(product) => {
              setSelectedProduct(product);
              setFormState("single");
            }}
            justGenerated={rexJustCreated}
          />

          <Box paddingTop={2}>
            <NextAndExit
              onExitClick={onExit}
              onNextClick={() => {
                onComplete(currentRex);
              }}
              exitEnabled={
                currentRex.products ? currentRex.products.length === 0 : true
              }
              nextEnabled={
                currentRex.products ? currentRex.products.length === 0 : true
              }
            />
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
