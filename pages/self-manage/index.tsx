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
import { generateRexDetails, RexDetails, rexDetails } from "src/rex";
import { FilledBar } from "@components/FilledBar";
import { useState } from "react";
import { NeedHelp } from "@components/NeedHelp";

const generateMultipleRexData = (num: number, completed?: boolean) =>
  Array(10)
    .fill(undefined)
    .map(() => generateRexDetails(completed));

type UserData = {
  rexData: Array<RexDetails>;
  quotas: Array<{
    title: string;
    type: "Allocated" | "First come first serve (FCFS)";
    total: number;
    used: number;
    pending: number;
  }>;
};

const Home: NextPage = () => {
  const [userData, setUserData] = useState<UserData>({
    rexData: [
      ...generateMultipleRexData(Math.floor(Math.random() * 10) + 5),
      ...generateMultipleRexData(Math.floor(Math.random() * 8) + 2, true),
    ],
    quotas: [
      {
        title: "Test Quota 1",
        type: "Allocated",
        total: 1000,
        used: 250,
        pending: 150,
      },
      {
        title: "Test Quota 2",
        type: "First come first serve (FCFS)",
        total: 4500,
        used: 1500,
        pending: 0,
      },
    ],
  });

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
                userData.quotas.map((quota) => {
                  const { pending, title, total, used, type } = quota;

                  return (
                    <Box key={quota.title} paddingTop={4}>
                      <Text fontSize="sm" fontWeight="bold">
                        {type}
                      </Text>
                      <Flex flexDirection="row">
                        <Box>
                          <Text fontWeight="bold">{title}</Text>
                        </Box>
                        <Flex flexDirection="column" flexGrow={1} paddingX={2}>
                          <Flex flexDirection="row">
                            <Box paddingX={1}>{`${used}kg used`}</Box>
                            {pending > 0 && (
                              <Box
                                style={{
                                  paddingLeft: `${
                                    (pending / total < 0.8
                                      ? pending / total
                                      : 0.8) * 100
                                  }%`,
                                }}
                              >{`${pending}kg pending`}</Box>
                            )}
                          </Flex>
                          <FilledBar
                            paddingX={1}
                            height="12px"
                            rounded
                            backgroundColor={"#EBEBEB"}
                            segments={[
                              { color: "#00558B", percent: used / total },
                              { color: "#9EE8FF", percent: pending / total },
                            ]}
                            type="stack"
                          />
                        </Flex>
                        <Flex flexDirection="column">
                          <Text fontSize="sm" fontWeight="bold">
                            {`${total - used - pending}kg remaining`}
                          </Text>
                          <Text fontSize="sm">{`${total}kg total`}</Text>
                        </Flex>
                      </Flex>
                    </Box>
                  );
                })
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

export default Home;
