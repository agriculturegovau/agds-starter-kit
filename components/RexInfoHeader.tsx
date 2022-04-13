import { Box, Flex } from "@ag.ds-next/box";
import { Text } from "@ag.ds-next/text";
import styled from "@emotion/styled";
import { ChevronRightIcon } from "@ag.ds-next/icon";
import { ClickableBox } from "./ClickableBox";
import { RexDetails, RexStatus } from "src/rex";
import { Column, Columns } from "@ag.ds-next/columns";

const HeadingBox = styled(Box)(() => ({
  border: "1px solid",
  borderColor: "#D3D3D3",
}));

const Chevron = styled(ChevronRightIcon)(() => ({
  transitionDuration: "0.2s",

  "&.open": {
    transform: "rotate(90deg)",
  },
}));

const TagBox = styled(Box)(({ color }) => {
  const finalColor = color === "muted" ? "#61696B" : "#0B996C";

  return {
    textAlign: "center",
    border: "1px solid",
    borderColor: finalColor,
    color: color === "success" ? "#fff" : finalColor,
    backgroundColor: color === "success" ? finalColor : "#fff",
  };
});

const RexTag = (status: RexStatus) => {
  switch (status) {
    case "REVIEW":
      return () => (
        <>
          <TagBox padding={0.5} rounded color="action">
            In Review
          </TagBox>
        </>
      );
    case "DRAFT":
      return () => (
        <>
          <TagBox padding={0.5} rounded color="muted">
            Draft
          </TagBox>
        </>
      );
    case "APPROVED":
      return () => (
        <>
          <TagBox padding={0.5} rounded color="success">
            Approved
          </TagBox>
        </>
      );
  }
};

type RexInfoHeaderProps = {
  isOpen: boolean;
  onClick?: () => void;
  rexDetails: RexDetails;
};

export function RexInfoHeader({
  isOpen,
  onClick,
  rexDetails,
}: RexInfoHeaderProps) {
  const Tag = RexTag(rexDetails.status);

  return (
    <HeadingBox rounded>
      <ClickableBox
        onClick={() => {
          onClick && onClick();
        }}
        padding={1.5}
      >
        <Columns style={{ width: "100%" }} gap={0.5}>
          <Column columnSpan={1} columnStart={1}>
            <Chevron className={isOpen ? "open" : ""} />
          </Column>
          <Column columnSpan={2}>
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                REX Number
              </Text>
              <Text fontSize="sm">
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Link Click");
                  }}
                >
                  {rexDetails.number}
                </a>
              </Text>
            </Flex>
          </Column>
          <Column columnSpan={2}>
            <Flex flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Date
              </Text>
              <Text fontSize="sm">{rexDetails.date}</Text>
            </Flex>
          </Column>
          <Column columnSpan={2}>
            <Flex paddingX={1} flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Product
              </Text>
              <Text fontSize="sm">{rexDetails.product}</Text>
            </Flex>
          </Column>
          <Column columnSpan={2}>
            <Flex paddingX={1} flexDirection="column">
              <Text fontSize="sm" fontWeight="bold">
                Exporting to
              </Text>
              <Text fontSize="sm">{rexDetails.exporting}</Text>
            </Flex>
          </Column>
          <Column columnSpan={1} columnEnd={12}>
            <Flex flexDirection="column">
              <Tag />
            </Flex>
          </Column>
        </Columns>
      </ClickableBox>
    </HeadingBox>
  );
}
