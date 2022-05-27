import type { GetStaticProps, NextPage } from "next";
import { Body } from "@ag.ds-next/body";
import { Content } from "@ag.ds-next/content";
import { AppLayout } from "@components/AppLayout";
import { DocumentTitle } from "@components/DocumentTitle";
import { Box, Flex } from "@ag.ds-next/box";
import { Heading } from "@ag.ds-next/heading";
import { Breadcrumbs } from "@ag.ds-next/breadcrumbs";
import { QuickActionBox } from "@components/QuickActionBox";
import { NewIcon } from "@components/icons/New";
import { CopyIcon } from "@components/icons/CopyIcon";
import { Text } from "@ag.ds-next/text";
import { NeedHelp } from "@components/NeedHelp";
import { dairyUser, UserData } from "src/user";
import Link from "next/link";
import { RexList } from "@components/RexList";
import { Button } from "@ag.ds-next/button";
import { WorldIcon } from "@components/icons/World";

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
                { label: "Consignments" },
              ]}
            />
            <Box paddingTop={2}>
              <Heading as="h2" fontSize="xxl">
                Consignments
              </Heading>
            </Box>

            <Box paddingY={4}>
              <Heading as="h3" fontSize="xl">
                Application Summary
              </Heading>
              <Flex
                padding={1}
                background="shade"
                flexDirection="row"
                style={{ marginTop: "24px" }}
              >
                <Flex
                  background="body"
                  flexGrow={1}
                  flexDirection="column"
                  padding={1}
                  alignItems="flex-start"
                  style={{ margin: "12px" }}
                >
                  <Text fontSize="lg" fontWeight="bold">
                    {
                      userData.rexData.filter((rex) => rex.status === "DRAFT")
                        .length
                    }
                  </Text>
                  <Text fontSize="md">In draft</Text>
                  <Link href="./self-manage/consignments?status=DRAFT">
                    <Button size="sm" variant="tertiary">
                      View
                    </Button>
                  </Link>
                </Flex>

                <Flex
                  background="body"
                  flexGrow={1}
                  flexDirection="column"
                  padding={1}
                  alignItems="flex-start"
                  style={{ margin: "12px" }}
                >
                  <Text fontSize="lg" fontWeight="bold">
                    {
                      userData.rexData.filter((rex) => rex.status === "REVIEW")
                        .length
                    }
                  </Text>
                  <Text fontSize="md">In review</Text>
                  <Link href="./self-manage/consignments?status=REVIEW">
                    <Button size="sm" variant="tertiary">
                      View
                    </Button>
                  </Link>
                </Flex>

                <Flex
                  background="body"
                  flexGrow={1}
                  flexDirection="column"
                  padding={1}
                  alignItems="flex-start"
                  style={{ margin: "12px" }}
                >
                  <Text fontSize="lg" fontWeight="bold">
                    0
                  </Text>
                  <Text fontSize="md">On hold</Text>
                  <Button size="sm" variant="tertiary">
                    View
                  </Button>
                </Flex>

                <Flex
                  background="body"
                  flexGrow={1}
                  flexDirection="column"
                  padding={1}
                  alignItems="flex-start"
                  style={{ margin: "12px" }}
                >
                  <Text fontSize="lg" fontWeight="bold">
                    {
                      userData.rexData.filter(
                        (rex) => rex.status === "APPROVED"
                      ).length
                    }
                  </Text>
                  <Text fontSize="md">Ready to print</Text>
                  <Link href="./self-manage/consignments?status=APPROVED">
                    <Button size="sm" variant="tertiary">
                      View
                    </Button>
                  </Link>
                </Flex>
              </Flex>
            </Box>

            <hr />

            <Box paddingY={4}>
              <Heading as="h3" fontSize="xl">
                Quick links
              </Heading>
              <Flex
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="space-between"
                paddingTop={1}
              >
                <QuickActionBox
                  icon={NewIcon}
                  title="Apply for export documentation"
                />
                <QuickActionBox
                  icon={CopyIcon}
                  title="Copy a previous export application"
                />
                <QuickActionBox
                  icon={WorldIcon}
                  title="Manual of Importing Country Requirements"
                  external
                />
              </Flex>
            </Box>

            <hr />

            <Box paddingY={4}>
              <Heading as="h3" fontSize="xl">
                In-progress export permit and certificate applications
              </Heading>

              <Box paddingTop={4}>
                <RexList
                  rexDetails={userData.rexData}
                  limit={5}
                  preSelectedStatuses={["DRAFT", "REVIEW"]}
                />

                <Flex justifyContent="space-between">
                  <Link href="self-manage/consignments/">
                    <Button size="sm" variant="tertiary">
                      See all
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="secondary">
                      + New request for export application
                    </Button>
                  </Link>
                </Flex>
              </Box>
            </Box>

            <Box paddingY={4}>
              <Heading as="h3" fontSize="xl">
                Export permit and certificate application history
              </Heading>

              <Box paddingTop={4}>
                <RexList
                  rexDetails={userData.rexData}
                  limit={5}
                  preSelectedStatuses={["APPROVED"]}
                />
                <Link href="self-manage/consignments/">
                  <Button size="sm" variant="tertiary">
                    See all
                  </Button>
                </Link>
              </Box>
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

export const getStaticProps: GetStaticProps = async () => {
  return { props: { userData: dairyUser } };
};

export default Dashboard;
