import { Box, Flex } from "@ag.ds-next/box";
import { Button } from "@ag.ds-next/button";
import { Text } from "@ag.ds-next/text";
import styled from "@emotion/styled";
import { FC } from "react";

type QuickActionBoxProps = {
  Icon?: FC;
  text: string;
  onClick?: () => void;
};

const BorderedBox = styled(Box)(() => ({
  border: "1px solid",
  borderRadius: "4px",
  margin: "0.5rem",
  height: "180px",
  minWidth: "200px",
  maxWidth: "360px",
  boxShadow: "0px 2px 4px 0px #0000004D",
  transitionDuration: "0.2s",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#eee",
  },
}));

const StyledButton = styled(Button)(() => ({
  textAlign: "left",
  textDecoration: "none",
  width: "100%",
  height: "100%",
  padding: 0,
}));

export const QuickActionBox = ({
  Icon,
  onClick,
  text,
}: QuickActionBoxProps) => {
  return (
    <BorderedBox flexGrow={1}>
      <StyledButton
        variant="tertiary"
        onClick={() => {
          onClick && onClick();
        }}
      >
        <Flex
          padding={0.5}
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          width="100%"
        >
          <Box>{Icon && <Icon />}</Box>
          <Box>
            {text.split("\n").map((line) => (
              <Text as="p" color="action" fontSize="lg" fontWeight="bold">
                {line}
              </Text>
            ))}
          </Box>
        </Flex>
      </StyledButton>
    </BorderedBox>
  );
};
