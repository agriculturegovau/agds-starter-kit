import { Box, Flex } from "@ag.ds-next/box";
import { Button } from "@ag.ds-next/button";
import { Heading } from "@ag.ds-next/heading";
import { LoadingDots } from "@ag.ds-next/loading";
import { Select } from "@ag.ds-next/select";
import { Text } from "@ag.ds-next/text";
import { TextInput } from "@ag.ds-next/text-input";
import { MeasureAmountUnit } from "@components/MeasureAmountUnit";
import {
  Ahecc,
  PackType,
  ProductCategory,
  ProductItem,
  UnitOfMeasure,
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

  const [selectData, setSelectData] = useState<{
    productItems: ProductItem[];
    productCategories: ProductCategory[];
    packTypes: PackType[];
    aheccs: Ahecc[];
  }>({
    aheccs: [],
    packTypes: [],
    productCategories: [],
    productItems: [],
  });

  const [selectedItems, setSelectedItems] = useState<
    Partial<{
      productItem: ProductItem;
      category: ProductCategory;
      packedIn: PackType;
      ahecc: Ahecc;
      netWeight: number;
      netWeightUnit: UnitOfMeasure;
      grossWeight: number;
      grossWeightUnit: UnitOfMeasure;
      outerPackaging: PackType;
      quantity: number;
      individualPackageWeight: number;
      individualPackageWeightUnit: UnitOfMeasure;
      shippingMarks: string;
    }>
  >(
    currentProduct
      ? currentProduct
      : {
          netWeight: 0,
          grossWeight: 0,
          quantity: 0,
          individualPackageWeight: 0,
          shippingMarks: "",
        }
  );

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
      setSelectData({
        productItems: productItemRes.data,
        productCategories: productCategoryRes.data,
        packTypes: packTypeRes.data,
        aheccs: aheccRes.data,
      });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (processing) {
      const testData: Partial<Omit<RexProductApiResponse, "rexId">> = {
        id: currentProduct?.id,
        productItemId: selectedItems.productItem?.id,
        categoryId: selectedItems.category?.id,
        packedInId: selectedItems.packedIn?.id,
        aheccId: selectedItems.ahecc?.id,
        netWeight: selectedItems.netWeight,
        netWeightUnitId: selectedItems.netWeightUnit?.id,
        grossWeight: selectedItems.grossWeight,
        grossWeightUnitId: selectedItems.grossWeightUnit?.id,
        outerPackagingId: selectedItems.outerPackaging?.id,
        quantity: selectedItems.quantity,
        individualPackageWeight: selectedItems.individualPackageWeight,
        individualPackageWeightUnitId:
          selectedItems.individualPackageWeightUnit?.id,
        shippingMarks: selectedItems.shippingMarks,
      };

      if (currentRex.id) {
        if (currentProduct) {
          updateProduct(currentRex, testData).then((res) => {
            if (res)
              onUpdate({
                ...currentRex,
                //@ts-ignore
                products: currentRex.products.map((product) =>
                  product.id === res.id ? res : product
                ),
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
              value={selectedItems.productItem?.value}
              onChange={(e) => {
                const newProductItem = selectData.productItems.find(
                  (productItem) => productItem.value === e.target.value
                );
                setSelectedItems((oldValue) => ({
                  ...oldValue,
                  productItem: newProductItem,
                }));
              }}
              options={selectData.productItems.map((productItem) => ({
                label: productItem.label,
                value: productItem.value,
              }))}
            />
          </Box>

          {selectedItems.productItem && (
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
                  value={selectedItems.category?.value}
                  onChange={(e) => {
                    const newProductCategory =
                      selectData.productCategories.find(
                        (productCategory) =>
                          productCategory.value === e.target.value
                      );
                    setSelectedItems((oldValue) => ({
                      ...oldValue,
                      category: newProductCategory,
                    }));
                  }}
                  options={selectData.productCategories.map(
                    (productCategory) => ({
                      label: productCategory.label,
                      value: productCategory.value,
                    })
                  )}
                />
              </Box>

              <Box paddingY={1}>
                <Select
                  block
                  label="What is the product packed in"
                  required
                  placeholder=" "
                  value={selectedItems.packedIn?.value}
                  onChange={(e) => {
                    const newPackType = selectData.packTypes.find(
                      (packType) => packType.value === e.target.value
                    );
                    setSelectedItems((oldValue) => ({
                      ...oldValue,
                      packedIn: newPackType,
                    }));
                  }}
                  options={selectData.packTypes.map((packType) => ({
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
                  value={selectedItems.ahecc?.value}
                  onChange={(e) => {
                    const newAhecc = selectData.aheccs.find(
                      (ahecc) => ahecc.value === e.target.value
                    );
                    setSelectedItems((oldValue) => ({
                      ...oldValue,
                      ahecc: newAhecc,
                    }));
                  }}
                  options={selectData.aheccs.map((ahecc) => ({
                    label: ahecc.label,
                    value: ahecc.value,
                  }))}
                />
              </Box>

              <MeasureAmountUnit
                amount={selectedItems.netWeight ? selectedItems.netWeight : 0}
                unitOfMeasure={selectedItems.netWeightUnit}
                amountLabel="Net metric weight amount"
                onChange={(amount, unit) => {
                  setSelectedItems((oldValue) => ({
                    ...oldValue,
                    netWeight: amount,
                    netWeightUnit: unit,
                  }));
                }}
                unitLabel="Net metric weight unit"
              />

              <MeasureAmountUnit
                amount={
                  selectedItems.grossWeight ? selectedItems.grossWeight : 0
                }
                unitOfMeasure={selectedItems.grossWeightUnit}
                amountLabel="Gross metric weight amount"
                onChange={(amount, unit) => {
                  setSelectedItems((oldValue) => ({
                    ...oldValue,
                    grossWeight: amount,
                    grossWeightUnit: unit,
                  }));
                }}
                unitLabel="Gross metric weight unit"
              />

              <Box paddingY={2}>
                <Heading as="h2" fontSize="xxl">
                  Add details for the product
                </Heading>
              </Box>

              <Box paddingY={1}>
                <Select
                  block
                  label="What is the product packed in"
                  required
                  placeholder=" "
                  value={selectedItems.outerPackaging?.value}
                  onChange={(e) => {
                    const newPackType = selectData.packTypes.find(
                      (packType) => packType.value === e.target.value
                    );
                    setSelectedItems((oldValue) => ({
                      ...oldValue,
                      outerPackaging: newPackType,
                    }));
                  }}
                  options={selectData.packTypes.map((packType) => ({
                    label: packType.label,
                    value: packType.value,
                  }))}
                />
              </Box>
              <Box paddingY={1}>
                <TextInput
                  label="Quantity"
                  value={selectedItems.quantity}
                  type="number"
                  onChange={(e) => {
                    setSelectedItems((oldValue) => ({
                      ...oldValue,
                      quantity: Number.parseInt(e.target.value),
                    }));
                  }}
                />
              </Box>

              <Box paddingY={1}>
                <MeasureAmountUnit
                  amount={
                    selectedItems.individualPackageWeight
                      ? selectedItems.individualPackageWeight
                      : 0
                  }
                  unitOfMeasure={selectedItems.individualPackageWeightUnit}
                  amountLabel="Individual package weight"
                  onChange={(amount, unit) => {
                    setSelectedItems((oldValue) => ({
                      ...oldValue,
                      individualPackageWeight: amount,
                      individualPackageWeightUnit: unit,
                    }));
                  }}
                  unitLabel="Weight unit"
                />
              </Box>

              <Box paddingY={1}>
                <TextInput
                  label="Shipping marks"
                  value={selectedItems.shippingMarks}
                  onChange={(e) => {
                    setSelectedItems((oldValue) => ({
                      ...oldValue,
                      shippingMarks: e.target.value,
                    }));
                  }}
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
