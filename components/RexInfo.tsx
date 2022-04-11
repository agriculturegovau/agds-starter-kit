import { Box, Flex } from "@ag.ds-next/box";
import { Text } from "@ag.ds-next/text";
import styled from "@emotion/styled";
import { ChevronRightIcon } from "@ag.ds-next/icon";

const HeadingBox = styled(Box)(() => ({
  border: "1px solid",
  borderColor: "#D3D3D3",
}));

type RexStatus = "REVIEW" | "DRAFT" | "APPROVED";

const TagBox = styled(Box)(({ color }) => {
  const finalColor = color === "muted" ? "#61696B" : "#0B996C";

  return {
    border: "1px solid",
    borderColor: finalColor,
    color: color === "success" ? "#fff" : finalColor,
    backgroundColor: color === "success" ? finalColor : "#fff",
  };
});

const rexDetails = {
  number: "REX0000236026",
  date: "04/01/2022",
  product: "Cheddar cheese (FTA)",
  exporting: "United States",
  status: "REVIEW",
  certificate: "7679",
  departureDate: "13/02/2022",
};

const RexTag = (status: RexStatus) => {
  switch (status) {
    case "REVIEW":
      return () => (
        <>
          <TagBox paddingX={0.5} rounded color="action">
            In Review
          </TagBox>
        </>
      );
    case "DRAFT":
      return () => (
        <>
          <TagBox paddingX={0.5} rounded color="muted">
            Draft
          </TagBox>
        </>
      );
    case "APPROVED":
      return () => (
        <>
          <TagBox paddingX={0.5} rounded color="success">
            Approved
          </TagBox>
        </>
      );
  }
};

export const RexInfo = () => {
  const Tag = RexTag(rexDetails.status as RexStatus);
  return (
    <HeadingBox rounded padding={1.5}>
      <Flex
        flexDirection="row"
        flexWrap="nowrap"
        justifyContent={"space-between"}
      >
        <Flex flexDirection="column">
          <ChevronRightIcon />
        </Flex>
        <Flex flexDirection="column">
          <Text fontSize="sm" fontWeight="bold">
            REX Number
          </Text>
          <Text fontSize="sm">
            <a>{rexDetails.number}</a>
          </Text>
        </Flex>
        <Flex flexDirection="column">
          <Text fontSize="sm" fontWeight="bold">
            Date
          </Text>
          <Text fontSize="sm">{rexDetails.date}</Text>
        </Flex>
        <Flex flexDirection="column">
          <Text fontSize="sm" fontWeight="bold">
            Product
          </Text>
          <Text fontSize="sm">{rexDetails.product}</Text>
        </Flex>
        <Flex flexDirection="column">
          <Text fontSize="sm" fontWeight="bold">
            Exporting to
          </Text>
          <Text fontSize="sm">{rexDetails.exporting}</Text>
        </Flex>
        <Flex flexDirection="column">
          <Tag />
        </Flex>
      </Flex>
    </HeadingBox>
  );
};
