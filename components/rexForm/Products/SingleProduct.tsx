import { Box } from "@ag.ds-next/box";
import { Button } from "@ag.ds-next/button";
import { Heading } from "@ag.ds-next/heading";
import { Text } from "@ag.ds-next/text";
import {
  Ahecc,
  PackType,
  Product,
  ProductCategory,
  ProductItem,
} from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { RexApiResponse, RexProductApiResponse } from "src/rexApplication";

type SingleProductFormProps = {
  currentRex: Partial<RexApiResponse>;
  onUpdate: (newRex: Partial<RexApiResponse>) => void;
  currentProduct?: RexProductApiResponse;
};

export const SingleProductForm = ({
  currentRex,
  currentProduct,
  onUpdate,
}: SingleProductFormProps) => {
  const [loading, setLoading] = useState(true);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [productCategory, setProductCategory] = useState<ProductCategory[]>([]);
  const [packTypes, setPackTypes] = useState<PackType[]>([]);
  const [aheccs, setAheccs] = useState<Ahecc[]>([]);

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    Promise.all([
      axios.get<ProductItem[]>(`/api/productItems/${currentRex.commodityType}`),
      axios.get<ProductCategory[]>(
        `/api/productCategories/${currentRex.commodityType}`
      ),
      axios.get<PackType[]>(`/api/packTypes`),
      axios.get<Ahecc[]>(`/api/ahecc`),
    ]).then((res) => {
      const [productItemRes, productCategoryRes, packTypeRes, aheccRes] = res;
      setProductItems(productItemRes.data);
      setProductCategory(productCategoryRes.data);
      setPackTypes(packTypeRes.data);
      setAheccs(aheccRes.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (processing) {
      const testData: Partial<Omit<RexProductApiResponse, "id" | "rexId">> = {
        productItemId: productItems[0].id,
        categoryId: productCategory[0].id,
        packedInId: packTypes[0].id,
        aheccId: aheccs[0].id,
      };
      console.log(testData);

      if (currentRex.id) {
        if (currentProduct) {
          console.log("update product");
          updateProduct(currentRex, testData).then((res) => {
            if (res)
              onUpdate({
                ...currentRex,
                //@ts-ignore
                products: [...currentRex.products, res],
              });
            setProcessing(false);
          });
        } else {
          console.log("add product");
          addProduct(currentRex, testData).then((res) => {
            onUpdate({
              ...currentRex,
              //@ts-ignore
              products: [...currentRex.products, res],
            });
            setProcessing(false);
          });
        }
      } else {
        console.log("createRex");
        createRex(currentRex).then((newRex) => {
          console.log("addProduct", { newRex });

          addProduct(newRex, testData).then((res) => {
            console.log("addProduct res", res);
            onUpdate({
              ...newRex,
              products: [res],
            });
            setProcessing(false);
          });
        });
      }
    }
  }, [processing]);

  return (
    <>
      <Heading as="h2" fontSize="xxl">
        Products for export
      </Heading>
      <Box paddingTop={2}>
        <Text as="p">
          Search for the product you wish to export. If you cannot find your
          product in the list please contact the Department.
        </Text>
      </Box>
      <Button
        loading={processing}
        onClick={async () => {
          setProcessing(true);
        }}
      >
        DO IT!
      </Button>
    </>
  );
};

const createRex = async (currentRex: Partial<RexApiResponse>) => {
  const res = await axios.post<RexProductApiResponse>(`/api/rex`, currentRex);
  return res.data;
};
const addProduct = async (
  currentRex: Partial<RexApiResponse>,
  currentProduct: Partial<RexProductApiResponse>
) => {
  const res = await axios.post<RexProductApiResponse>(
    `/api/rex/${currentRex.rexNumber}/product`,
    currentProduct
  );
  return res.data;
};
const updateProduct = async (
  currentRex: Partial<RexApiResponse>,
  currentProduct: Partial<RexProductApiResponse>
) => {
  const productId = currentProduct?.id;
  if (productId) {
    const res = await axios.patch<RexProductApiResponse>(
      `/api/rex/${currentRex.rexNumber}/product/${productId}`,
      currentProduct
    );
    return res.data;
  }
};
