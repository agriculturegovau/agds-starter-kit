import { RexInfoHeader } from "./RexInfoHeader";
import { Box, Flex } from "@ag.ds-next/box";
import { Text } from "@ag.ds-next/text";
import styled from "@emotion/styled";
import React, { useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useElementSize, usePrefersReducedMotion } from "@ag.ds-next/core";
import { RexDetails } from "src/rex";
import Link from "next/link";

const BodyBox = styled(Box)(() => ({
  border: "1px solid",
  borderTop: "none",
  paddingTop: "4px",
  marginTop: "-4px",
  borderColor: "#D3D3D3",
  transitionDuration: "0.2s",
}));

type RexInfoProps = {
  rexDetails: RexDetails;
};

export const RexInfo = ({ rexDetails }: RexInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const { height } = useElementSize(ref);

  const prefersReducedMotion = usePrefersReducedMotion();
  const style = useSpring({
    from: { height: 0 },
    to: { height: isOpen ? height : 0 },
    immediate: prefersReducedMotion,
  });

  return (
    <>
      <RexInfoHeader
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
        rexDetails={rexDetails}
      />
      <animated.section style={{ overflow: "hidden", ...style }}>
        <BodyBox ref={ref}>
        <Flex paddingY={1} height="100%" flexDirection="row">
            <Flex paddingX={6} flexDirection="column">
              <Box paddingY={1}>
                <Text fontSize="sm" fontWeight="bold">
                  <Link href={`self-manage/consignments/${rexDetails.number}`}>
                    View Detail
                  </Link>
                </Text>
              </Box>

              <Flex flexDirection="column" paddingY={1}>
                <Text fontSize="sm" fontWeight="bold">
                  Actions
                </Text>
                {(rexDetails.status === "APPROVED"
                  ? ["Copy for new REX", "View REX extract"]
                  : [
                      "Amend",
                      "Copy for new REX",
                      "Request assistance with REX",
                      "View REX extract",
                      "Withdraw",
                    ]
                ).map((link) => (
                  <Text key={link} fontSize="sm" paddingY={0.5}>
                    <a>{link}</a>
                  </Text>
                ))}
              </Flex>

              <Flex flexDirection="column" paddingY={1}>
                <Text fontSize="sm" fontWeight="bold">
                  View Certificates
                </Text>
                {["Export Certificate", "Quota Certificate"].map((link) => (
                  <Text key={link} fontSize="sm" paddingY={0.5}>
                    <a>{link}</a>
                  </Text>
                ))}
              </Flex>
            </Flex>
            <Flex paddingX={6} flexDirection="column">
              <Flex flexDirection="column" paddingY={1}>
                {[
                  { label: "Products", value: rexDetails.product },
                  {
                    label: "Exporting to",
                    value: rexDetails.destinationCountry,
                  },
                  {
                    label: "Certificate Number",
                    value: rexDetails.certificate,
                  },
                  {
                    label: "Date of departure",
                    value: rexDetails.departureDate,
                  },
                ].map((item) => (
                  <React.Fragment key={item.label}>
                    <Text fontSize="sm" fontWeight="bold">
                      {item.label}
                    </Text>
                    <Text fontSize="sm" paddingY={0.5}>
                      {item.value}
                    </Text>
                  </React.Fragment>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </BodyBox>
      </animated.section>
    </>
  );
};
