import type { NextPage } from "next";
import { Text } from "@ag.ds-next/text";
import { Body } from "@ag.ds-next/body";
import { Content } from "@ag.ds-next/content";
import { AppLayout } from "@components/AppLayout";
import { DocumentTitle } from "@components/DocumentTitle";
import { Box, Flex } from "@ag.ds-next/box";
import styled from "@emotion/styled";
import { Heading } from "@ag.ds-next/heading";
import Image from "next/image";

const RightImage = styled.img`
  float: right;
`;

const ImageFader = styled(RightImage)`
  mask-image: linear-gradient(270deg, black 8%, transparent 82%);
  -webkit-mask-image: linear-gradient(270deg, black 8%, transparent 82%);
`;

const AbsoluteDiv = styled(Box)`
  position: relative;
  height: 100%;
`;

const BottomFlex = styled(Flex)`
  margin-bottom: -40px;
`;

const sectionPadding = 5;

const Section = ({
  headingText,
  children,
}: {
  headingText: string;
  children: JSX.Element;
}) => (
  <>
    <Heading as="h2" fontSize="xl">
      {headingText}
    </Heading>
    {children}
  </>
);

const Home: NextPage = () => {
  return (
    <>
      <DocumentTitle title="Home" />
      <AppLayout navHrefOverride="/">
        <Box background="shadeAlt">
          <Box
            height="500px"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <AbsoluteDiv>
              <ImageFader src="/images/cargo.png" height="500px" />
            </AbsoluteDiv>
            <AbsoluteDiv style={{ top: "-500px" }}>
              <Content>
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  style={{
                    width: "50%",
                    height: "500px",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <Heading as="h2" fontSize={["xl", "xl", "xxl", "xxxl"]}>
                    Manage your Department export requirements from one place
                  </Heading>
                  <Text as="p" fontSize={["sm", "sm", "sm", "md"]}>
                    Generate, edit and manage your export certificates and
                    permits from your Export Service account — your new single
                    place to manage interactions with the Department.
                  </Text>
                </Flex>
              </Content>
            </AbsoluteDiv>
          </Box>
        </Box>
        <Content>
          <Body>
            <Box paddingY={sectionPadding}>
              <Flex flexDirection="row" justifyContent="space-around">
                <Box>
                  <img src="/images/consignments.png" />
                </Box>
                <Box paddingLeft={5}>
                  <Section
                    headingText="A single place to manage your interactions with the
                    Department"
                  >
                    <ul>
                      <li>
                        See your consignments in the context of other relevant
                        regulatory export information such as Micor and Industry
                        Advice Notices
                      </li>
                      <li>
                        Access export data and insights in relation to
                        optimising regulation requirements
                      </li>
                      <li>
                        Manage your Department interactions such as payments,
                        notifications, through a single account
                      </li>
                    </ul>
                  </Section>
                </Box>
              </Flex>
            </Box>
          </Body>
        </Content>
        <Box>
          <Content>
            <BottomFlex alignItems="flex-end">
              <Flex
                alignItems="center"
                flexDirection="column"
              >
                <Box paddingY={sectionPadding}>
                  <Flex flexDirection="column" justifyContent="flex-start">
                    <Section
                      headingText="Giving you the control to manage your certificate and
                      permit needs directly"
                    >
                      <ul>
                        <li>
                          Apply for export permits and certificates directly
                          from the Department, without the need for third-party
                          software or an agent
                        </li>
                        <li>
                          Update and edit your Request for Permit/Request to
                          Export yourself, 24-7
                        </li>
                        <li>
                          Access Department support directly through the service
                        </li>
                      </ul>
                    </Section>
                  </Flex>
                </Box>
                <Box paddingY={sectionPadding}>
                  <Flex flexDirection="column" justifyContent="flex-start">
                    <Section
                      headingText="Apply for permits and certificates the way that suits you
                      and your business"
                    >
                      <Text as="p">
                        To be an exporter, you will always need to register with
                        the Department, but there is choice in how this is
                        managed and the level of direct interaction that suits
                        you and your business. Explore the options for managing
                        your export permits, certificates and more.
                      </Text>
                    </Section>
                  </Flex>
                </Box>
              </Flex>
              <Box width="200%" display={{md: "none", lg: "block"}}>
                <Image
                  src="/images/exportApp.png"
                  layout="responsive"
                  width="1272"
                  height="1862"
                />
              </Box>
            </BottomFlex>
          </Content>
        </Box>
      </AppLayout>
    </>
  );
};

export default Home;
