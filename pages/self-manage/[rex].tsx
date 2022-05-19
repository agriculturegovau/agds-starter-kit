import type { GetServerSideProps, NextPage } from "next";
import { Body } from "@ag.ds-next/body";
import { Content } from "@ag.ds-next/content";
import { AppLayout } from "@components/AppLayout";
import { DocumentTitle } from "@components/DocumentTitle";
import { Box, Flex } from "@ag.ds-next/box";
import { Text } from "@ag.ds-next/text";
import { Heading } from "@ag.ds-next/heading";
import { Breadcrumbs } from "@ag.ds-next/breadcrumbs";
import { generateRexDetails, RexDetails } from "src/rex";
import { FilledBar } from "@components/FilledBar";
import { NeedHelp } from "@components/NeedHelp";
import { dairyUser, Quota } from "src/user";
import { ProgressIndicator } from "@ag.ds-next/progress-indicator";
import styled from "@emotion/styled";
import { RexTag } from "@components/RexTag";
import { QuotaInfo } from "@components/QuotaInfo";
import { CertificateCollapsible } from "@components/CertificateCollapsible";
import { FlowProgress } from "@components/flow-progress/FlowProgress";

type DetailsProps = {
  rexData: RexDetails;
  quotas: Array<Quota>;
};

const BottomBorderedBox = styled(Flex)({
  borderBottom: "1px solid #808080",
});

const TopBorderedBox = styled(Flex)({
  borderTop: "1px solid #808080",
});

const Detail: NextPage<DetailsProps> = ({ quotas, rexData }) => {
  const Tag = RexTag(rexData.status);

  return (
    <>
      <DocumentTitle title="Home" />
      <AppLayout navHrefOverride="/">
        <Content>
          <Body>
            <Breadcrumbs
              links={[
                { href: "/", label: "Home" },
                { href: "/self-manage", label: "Manage my consignments" },
                { label: `Export application ${rexData.number}` },
              ]}
            />
            <Box paddingY={4}>
              <Heading as="h2" fontSize="xxl">
                {`Export application ${rexData.number}`}
              </Heading>
            </Box>

            <Box paddingY={4}>
              <Heading as="h3" fontSize="xl">
                Application progress
              </Heading>
              <Box paddingY={4}>
                <FlowProgress
                  progressItems={[
                    {
                      title: "Draft",
                      status: rexData.status === "DRAFT" ? "doing" : "done",
                    },
                    {
                      title: "In Progress",
                      status: rexData.status === "DRAFT" ? "todo" : "done",
                    },
                    {
                      title: "In Review",
                      status:
                        rexData.status === "DRAFT"
                          ? "todo"
                          : rexData.status === "REVIEW"
                          ? "doing"
                          : "done",
                      ...{
                        detail:
                          rexData.status === "REVIEW"
                            ? "The REX has been authorised but there is information pertaining to the certificate that requires review by the department. "
                            : undefined,
                      },
                    },
                    {
                      title: "Certificates Ready",
                      status: rexData.status === "APPROVED" ? "done" : "todo",
                    },
                    {
                      title: "Completed",
                      status: rexData.status === "APPROVED" ? "done" : "todo",
                    },
                  ]}
                />
              </Box>
            </Box>

            <Box paddingY={4}>
              <Heading as="h3" fontSize="xl">
                Application details
              </Heading>
              <Box paddingY={4}>
                <BottomBorderedBox flexDirection="row" paddingY={0.75}>
                  <Text fontSize="sm" fontWeight="bold" width="30%">
                    Application Number
                  </Text>
                  <Text fontSize="sm">{rexData.number}</Text>
                </BottomBorderedBox>
                <BottomBorderedBox flexDirection="row" paddingY={0.75}>
                  <Text fontSize="sm" fontWeight="bold" width="30%">
                    Created on
                  </Text>
                  <Text fontSize="sm">{rexData.date}</Text>
                </BottomBorderedBox>
                <BottomBorderedBox flexDirection="row" paddingY={0.75}>
                  <Text fontSize="sm" fontWeight="bold" width="30%">
                    Exporter reference
                  </Text>
                  <Text fontSize="sm">{`${rexData.date
                    .split("/")
                    .splice(0, 2)
                    .join("")}-${rexData.product
                    .split(" ")
                    .join("")
                    .split(",")
                    .join("")
                    .toLowerCase()}`}</Text>
                </BottomBorderedBox>
                <BottomBorderedBox flexDirection="row" paddingY={0.75}>
                  <Text fontSize="sm" fontWeight="bold" width="30%">
                    Exporting to
                  </Text>
                  <Text fontSize="sm">{rexData.destinationCountry}</Text>
                </BottomBorderedBox>
                <BottomBorderedBox flexDirection="row" paddingY={0.75}>
                  <Text fontSize="sm" fontWeight="bold" width="30%">
                    Products
                  </Text>
                  <Text fontSize="sm">{rexData.product}</Text>
                </BottomBorderedBox>
                <BottomBorderedBox flexDirection="row" paddingY={0.75}>
                  <Text fontSize="sm" fontWeight="bold" width="30%">
                    Status
                  </Text>
                  <Tag />
                </BottomBorderedBox>
              </Box>
            </Box>

            {quotas.length > 0 && (
              <Box paddingY={4}>
                <Heading as="h3" fontSize="xl">
                  Quota
                </Heading>
                <hr />
                <Box paddingY={4}>
                  {quotas.map((quota) => (
                    <QuotaInfo
                      key={`${quota.destinationCountry}${quota.product}`}
                      quota={quota}
                    />
                  ))}
                </Box>
              </Box>
            )}

            <Box paddingY={4}>
              <BottomBorderedBox paddingY={2}>
                <Heading as="h3" fontSize="xl">
                  Certificate preview
                </Heading>
              </BottomBorderedBox>
              <BottomBorderedBox paddingY={2}>
                <CertificateCollapsible />
              </BottomBorderedBox>
              <BottomBorderedBox paddingY={2}>
                <CertificateCollapsible />
              </BottomBorderedBox>
            </Box>

            <hr />

            <Box paddingY={4}>
              <Box paddingY={2}>
                <Heading as="h3" fontSize="xl">
                  History
                </Heading>
              </Box>
              <Flex flexDirection="row" justifyContent="space-between" padding={2} border rounded>
                <Flex flexDirection="column">
                  <Text fontSize="sm" fontWeight="bold">
                    Status
                  </Text>
                  <Text fontSize="sm">Draft</Text>
                </Flex>
                <Flex flexDirection="column">
                  <Text fontSize="sm" fontWeight="bold">
                    Date
                  </Text>
                  <Text fontSize="sm">02/02/2020</Text>
                </Flex>
                <Flex flexDirection="column">
                  <Text fontSize="sm" fontWeight="bold">
                    User
                  </Text>
                  <Text fontSize="sm">John Doe</Text>
                </Flex>
                <Flex flexDirection="column">
                  <Text fontSize="sm" fontWeight="bold">
                    Application
                  </Text>
                  <Text fontSize="sm">Application Edit</Text>
                </Flex>
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { rex } = query;

  if (!rex || Array.isArray(rex)) {
    return {
      notFound: true,
    };
  }

  const rexData = dairyUser.rexData.find((r) => r.number === rex);
  if (!rexData) {
    return {
      notFound: true,
    };
  }

  const quotas = dairyUser.quotas.filter(
    (q) =>
      q.destinationCountry === rexData.destinationCountry &&
      q.product === rexData.product
  );

  return { props: { rexData, quotas } };
};

export default Detail;
