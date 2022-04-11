import type { NextPage } from "next";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
} from "@ag.ds-next/accordion";
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
import { AddressBookIcon } from "@components/icons/AddressBook";
import { RexInfo } from "@components/RexInfo";

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
                <RexInfo />
              </Box>
            </Box>
          </Body>
        </Content>
      </AppLayout>
    </>
  );
};

export default Home;
