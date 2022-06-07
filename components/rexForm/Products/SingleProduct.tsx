import { Box } from "@ag.ds-next/box";
import { Button } from "@ag.ds-next/button";
import { Column, Columns } from "@ag.ds-next/columns";
import { Heading } from "@ag.ds-next/heading";
import { LoadingDots } from "@ag.ds-next/loading";
import { Select } from "@ag.ds-next/select";
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
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
  const [packTypes, setPackTypes] = useState<PackType[]>([]);
  const [aheccs, setAheccs] = useState<Ahecc[]>([]);

  const [selectedProductItem, setSelectedProductItem] = useState<ProductItem>();
  const [selectedProductCategory, setSelectedProductCategory] =
    useState<ProductCategory>();
  const [selectedPackType, setSelectedPackType] = useState<PackType>();
  const [selectedOuterPackType, setSelectedOuterPackType] =
    useState<PackType>();
  const [selectedAhecc, setSelectedAhecc] = useState<Ahecc>();

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
      setProductCategories(productCategoryRes.data);
      setPackTypes(packTypeRes.data);
      setAheccs(aheccRes.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (processing) {
      const testData: Partial<Omit<RexProductApiResponse, "id" | "rexId">> = {
        productItemId: selectedProductItem?.id,
        categoryId: selectedProductCategory?.id,
        packedInId: selectedPackType?.id,
        aheccId: selectedAhecc?.id,
      };

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
        createRex(currentRex).then((newRex) => {
          addProduct(newRex, testData).then((res) => {
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
      <Box paddingY={2}>
        <Text as="p">
          Search for the product you wish to export. If you cannot find your
          product in the list please contact the Department.
        </Text>
      </Box>
      {loading && <LoadingDots size="lg" aria-label="Loading" role="status" />}
      {!loading && (
        <>
          <Box paddingY={2}>
            <Select
              block
              label="Product you wish to export to"
              required
              placeholder=" "
              value={selectedProductItem?.value}
              onChange={(e) => {
                const newProductItem = productItems.find(
                  (productItem) => productItem.value === e.target.value
                );
                setSelectedProductItem(newProductItem);
              }}
              options={productItems.map((productItem) => ({
                label: productItem.label,
                value: productItem.value,
              }))}
            />
          </Box>

          {selectedProductItem && (
            <>
              <Box paddingY={2}>
                <Heading as="h2" fontSize="xxl">
                  Add details for the product
                </Heading>
              </Box>

              <Box paddingY={1}>
                <Select
                  block
                  label="What is the product category"
                  required
                  placeholder=" "
                  value={selectedProductCategory?.value}
                  onChange={(e) => {
                    const newProductCategory = productCategories.find(
                      (productCategory) =>
                        productCategory.value === e.target.value
                    );
                    setSelectedProductCategory(newProductCategory);
                  }}
                  options={productCategories.map((productCategory) => ({
                    label: productCategory.label,
                    value: productCategory.value,
                  }))}
                />
              </Box>

              <Box paddingY={1}>
                <Select
                  block
                  label="What is the product packed in"
                  required
                  placeholder=" "
                  value={selectedPackType?.value}
                  onChange={(e) => {
                    const newPackType = packTypes.find(
                      (packType) => packType.value === e.target.value
                    );
                    setSelectedPackType(newPackType);
                  }}
                  options={packTypes.map((packType) => ({
                    label: packType.label,
                    value: packType.value,
                  }))}
                />
              </Box>
              <Box paddingY={1}>
                <Select
                  block
                  label="AHECC"
                  required
                  placeholder=" "
                  hint="The Australian Harmonized Export Commodity Classification (AHECC) is the product classification used to identify goods being exported from Australia."
                  value={selectedAhecc?.value}
                  onChange={(e) => {
                    const newAhecc = aheccs.find(
                      (ahecc) => ahecc.value === e.target.value
                    );
                    setSelectedAhecc(newAhecc);
                  }}
                  options={aheccs.map((ahecc) => ({
                    label: ahecc.label,
                    value: ahecc.value,
                  }))}
                />
              </Box>

              <Button
                loading={processing}
                onClick={() => {
                  setProcessing(true);
                }}
              >
                Next
              </Button>
            </>
          )}
        </>
      )}
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
