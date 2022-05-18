import { Box, Flex } from "@ag.ds-next/box";
import { Text } from "@ag.ds-next/text";
import { useElementSize, usePrefersReducedMotion } from "@ag.ds-next/core";
import styled from "@emotion/styled";
import { useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { ChevronRightIcon } from "@ag.ds-next/icon";
import { RexTag } from "./RexTag";

const Chevron = styled(ChevronRightIcon)(() => ({
  transitionDuration: "0.2s",

  "&.open": {
    transform: "rotate(90deg)",
  },
}));

export const CertificateCollapsible = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const { height } = useElementSize(ref);

  const prefersReducedMotion = usePrefersReducedMotion();
  const style = useSpring({
    from: { height: 0 },
    to: { height: isOpen ? height : 0 },
    immediate: prefersReducedMotion,
  });

  const BorderBox = styled(Box)(() => ({
    border: "1px solid",
  }));

  const Tag = RexTag("DRAFT");

  return (
    <>
      <Box>
        <Flex
          flexDirection="row"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Box paddingX={2}>
            <Chevron className={isOpen ? "open" : ""} />
          </Box>
          <Box flexGrow={1}>Export Certificate</Box>
        </Flex>

        <animated.section style={{ overflow: "hidden", ...style }}>
          <BorderBox ref={ref}>
            <Flex paddingY={1} height="100%" flexDirection="row">
              <Flex paddingX={6} flexDirection="column">
                {["Certificate number", "Date issued", "Place issued"].map(
                  (head) => (
                    <Flex flexDirection="column" paddingY={0.5}>
                      <Text fontSize="sm" fontWeight="bold">
                        {head}
                      </Text>
                      <Text fontSize="sm" paddingY={0.5}>
                        Not yet issued
                      </Text>
                    </Flex>
                  )
                )}

                <Flex flexDirection="column" paddingY={0.5}>
                  <Text fontSize="sm" fontWeight="bold">
                    Certificate Status
                  </Text>
                  <Tag />
                </Flex>

                <Flex flexDirection="column" paddingY={0.5}>
                  <Text fontSize="sm" fontWeight="bold">
                    Consignee name
                  </Text>
                  <Text fontSize="sm" paddingY={0.5}>
                    Mallory Villarreal
                  </Text>
                </Flex>

                <Flex flexDirection="column" paddingY={0.5}>
                  <Text fontSize="sm" fontWeight="bold">
                    Consignee address
                  </Text>
                  <Text fontSize="sm" paddingY={0.25}>
                    Address line 1
                  </Text>
                  <Text fontSize="sm" paddingY={0.25}>
                    Address line 2
                  </Text>
                  <Text fontSize="sm" paddingY={0.25}>
                    Address line 3
                  </Text>
                </Flex>
              </Flex>
              <Flex paddingX={6} flexDirection="column">
                <Flex flexDirection="column" paddingY={1}>
                  <Text fontSize="sm" fontWeight="bold">
                    Application Number
                  </Text>
                  <Text fontSize="sm" paddingY={0.5}>12345</Text>
                </Flex>
              </Flex>
            </Flex>
          </BorderBox>
        </animated.section>
      </Box>
    </>
  );
};
