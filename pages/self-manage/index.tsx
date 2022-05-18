import type { GetServerSideProps, NextPage } from "next";
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
import { FilledBar } from "@components/FilledBar";
import { NeedHelp } from "@components/NeedHelp";
import { dairyUser, UserData } from "src/user";
import { QuotaInfo } from "@components/QuotaInfo";

type DashboardProps = {
  userData: UserData;
};

const Dashboard: NextPage<DashboardProps> = ({ userData }) => {
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
            <Box paddingTop={2}>
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
                  icon={NewIcon}
                  title="Make a new request to export application"
                />
                <QuickActionBox
                  icon={CopyIcon}
                  title="Copy a previous export application"
                />
                <QuickActionBox
                  icon={AddressBookIcon}
                  title="View my address book"
                />
              </Flex>
            </Box>

            <hr />

            <Box paddingY={4}>
              <Heading as="h3" fontSize="xl">
                In-progress export permit and certificate applications
              </Heading>

              <Box paddingTop={4}>
                {userData.rexData
                  .filter((rex) => rex.status !== "APPROVED")
                  .map((rexDetails) => (
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
                {userData.rexData
                  .filter((rex) => rex.status === "APPROVED")
                  .map((rexDetails) => (
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

              {userData.quotas.length === 0 ? (
                <Text>Not enrolled in any Quotas</Text>
              ) : (
                userData.quotas.map((quota) => (
                  <QuotaInfo
                    key={`${quota.destinationCountry}${quota.product}`}
                    quota={quota}
                  />
                ))
              )}
            </Box>

            <hr />

            <Box paddingTop={4}>
              <Heading as="h3" fontSize="xl">
                Tools and resources
              </Heading>

              <Flex flexDirection="row" flexWrap="wrap" paddingTop={1}>
                <QuickActionBox
                  title="Help me export"
                  text="Answer a few quick questions to find export info and services specific to your needs."
                />
                <QuickActionBox
                  title="Micor"
                  text="Check importing country requirements."
                />
                <QuickActionBox
                  title="Insights and updates"
                  text="Get the latest market insights and changes to importing country requirements. "
                />
              </Flex>
            </Box>

            <hr />

            <Box paddingY={4}>
              <NeedHelp />
            </Box>
          </Body>
        </Content>
      </AppLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: { userData: dairyUser } };
};

export default Dashboard;
