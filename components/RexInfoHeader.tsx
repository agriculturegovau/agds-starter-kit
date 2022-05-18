import { Box, Flex } from "@ag.ds-next/box";
import { Text } from "@ag.ds-next/text";
import styled from "@emotion/styled";
import { ChevronRightIcon } from "@ag.ds-next/icon";
import { ClickableBox } from "./ClickableBox";
import { RexDetails } from "src/rex";
import { Column, Columns } from "@ag.ds-next/columns";
import Link from "next/link";
import { RexTag } from "./RexTag";

const HeadingBox = styled(Box)(() => ({
  border: "1px solid",
  borderColor: "#E0E0E0",
}));

const Chevron = styled(ChevronRightIcon)(() => ({
  transitionDuration: "0.2s",

  "&.open": {
    transform: "rotate(90deg)",
  },
}));

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
                <Link href={`/self-manage/${rexDetails.number}`}>
                  {rexDetails.number}
                </Link>
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
              <Text fontSize="sm">{rexDetails.destinationCountry}</Text>
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
