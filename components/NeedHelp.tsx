import { Flex, Box } from "@ag.ds-next/box";
import { Text } from "@ag.ds-next/text";
import styled from "@emotion/styled";

const CalloutBox = styled(Flex)(() => ({
  borderLeft: "4px solid #808080",
}));

export const NeedHelp = () => {
  return (
    <CalloutBox background="shade" maxWidth="50%" flexDirection="column" padding={1}>
      <Text fontSize="md" fontWeight="bold">
        Need help?
      </Text>
      <Text fontSize="sm">
        Call 1800 5781 125 (9am to 5pm AEST Monday to Friday)
      </Text>
      <Text fontSize="sm">
        Email{" "}
        <a href="mailto:exportservice@awe.gov.au">exportservice@awe.gov.au</a>
      </Text>
    </CalloutBox>
  );
};
