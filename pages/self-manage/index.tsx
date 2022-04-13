import type { NextPage } from "next";
import { Body } from "@ag.ds-next/body";
import { Content } from "@ag.ds-next/content";
import { AppLayout } from "@components/AppLayout";
import { DocumentTitle } from "@components/DocumentTitle";
import { Box, Flex } from "@ag.ds-next/box";
import { Text } from "@ag.ds-next/text";
import { Heading } from "@ag.ds-next/heading";
import { Breadcrumbs } from "@ag.ds-next/breadcrumbs";
import { QuickActionBox } from "@components/QuickActionBox";
import { NewIcon } from "@components/icons/New";
import { CopyIcon } from "@components/icons/CopyIcon";
import { AddressBookIcon } from "@components/icons/AddressBook";
import { RexInfo } from "@components/RexInfo";
import { generateRexDetails, rexDetails } from "src/rex";

const rexData = Array(10)
  .fill(undefined)
  .map(() => generateRexDetails());

const oldRexData = Array(5)
  .fill(undefined)
  .map(() => generateRexDetails(true));

const Home: NextPage = () => {
  return (
    <>
      <DocumentTitle title="Home" />
      <AppLayout navHrefOverride="/">
        <Content>
          <Body>
            <Breadcrumbs
              links={[
                { href: "/", label: "Home" },
                { label: "Manage my consignments" },
              ]}
            />
            <Box paddingY={4}>
              <Heading as="h2" fontSize="xxl">
                Manage my consignments
              </Heading>
            </Box>
            <Box paddingY={4}>
              <Heading as="h3" fontSize="xl">
                Quick actions
              </Heading>
              <Flex flexDirection="row" flexWrap="wrap" paddingTop={1}>
                <QuickActionBox
                  Icon={NewIcon}
                  text="Make a new request to export application"
                />
                <QuickActionBox
                  Icon={CopyIcon}
                  text="Copy a previous export application"
                />
                <QuickActionBox
                  Icon={AddressBookIcon}
                  text={`View my address book\n${"\u00A0"}`}
                />
              </Flex>
            </Box>

            <hr />

            <Box paddingY={4}>
              <Heading as="h3" fontSize="xl">
                In-progress export permit and certificate applications
              </Heading>

              <Box paddingTop={4}>
                {rexData.map((rexDetails) => (
                  <RexInfo
                    key={rexDetails.date + rexDetails.departureDate}
                    rexDetails={rexDetails}
                  />
                ))}
                <Box width="100%" background="shade" padding={2}>
                  <a>
                    <Text fontSize="sm">
                      + New request for export application
                    </Text>
                  </a>
                </Box>
                <a>
                  <Text fontSize="sm">See all</Text>
                </a>
              </Box>
            </Box>

            <Box paddingY={4}>
              <Heading as="h3" fontSize="xl">
                Export permit and certificate application history
              </Heading>

              <Box paddingTop={4}>
                {oldRexData.map((rexDetails) => (
                  <RexInfo
                    key={rexDetails.date + rexDetails.departureDate}
                    rexDetails={rexDetails}
                  />
                ))}
                <a>
                  <Text fontSize="sm">See all</Text>
                </a>
              </Box>
            </Box>

            <hr />

            <Box paddingY={4}>
              <Heading as="h3" fontSize="xl">
                Quota
              </Heading>

              <Box paddingTop={4}></Box>
            </Box>
          </Body>
        </Content>
      </AppLayout>
    </>
  );
};

export default Home;
