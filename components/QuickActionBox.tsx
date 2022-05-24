import { Box, Flex } from "@ag.ds-next/box";
import { Button } from "@ag.ds-next/button";
import { Text } from "@ag.ds-next/text";
import styled from "@emotion/styled";
import { FC } from "react";
import { ExternalLinkIcon } from "@ag.ds-next/icon";

type QuickActionBoxProps = {
  icon?: FC;
  title?: string;
  text?: string;
  onClick?: () => void;
  external?: boolean;
};

const BorderedBox = styled(Box)(() => ({
  border: "1px solid",
  borderRadius: "4px",
  margin: "0.5rem",
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

const FloatingIcon = styled(Box)(() => ({
  position: "relative",
  top: "-35%",
}));

export const QuickActionBox = ({
  external,
  icon: Icon,
  onClick,
  text,
  title,
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
          flexDirection="row"
          justifyContent="space-around"
          height="100%"
          width="100%"
        >
          {Icon && (
            <Box>
              <Icon />
            </Box>
          )}
          {title && (
            <Box flexGrow={1.5} paddingLeft={1}>
              <Text as="p" fontSize="md" color="action" fontWeight="bold">
                {title}
              </Text>
            </Box>
          )}
          {text && (
            <Box>
              {text.split("\n").map((line) => (
                <Text key={line} as="p" fontSize="sm">
                  {line}
                </Text>
              ))}
            </Box>
          )}
        </Flex>
        {external && (
          <FloatingIcon>
            <ExternalLinkIcon size="sm" />
          </FloatingIcon>
        )}
      </StyledButton>
    </BorderedBox>
  );
};
