import { Body } from "@ag.ds-next/body";
import { Box } from "@ag.ds-next/box";
import { Breadcrumbs } from "@ag.ds-next/breadcrumbs";
import { Content } from "@ag.ds-next/content";
import { Heading } from "@ag.ds-next/heading";
import { AppLayout } from "@components/AppLayout";
import { DocumentTitle } from "@components/DocumentTitle";
import { RexList } from "@components/RexList";
import { GetStaticProps, NextPage } from "next";
import { dairyUser, UserData } from "src/user";

type ConsignmentProps = {
  userData: UserData;
};

const Consignments: NextPage<ConsignmentProps> = ({ userData }) => {
  return (
    <>
      <DocumentTitle title="Home" />
      <AppLayout navHrefOverride="/">
        <Content>
          <Body>
            <Breadcrumbs
              links={[{ href: "/", label: "Home" }, { label: "Consignments" }]}
            />
            <Box paddingTop={2}>
              <Heading as="h2" fontSize="xxl">
                Consignments
              </Heading>
            </Box>

            <Box paddingY={4}>
              <RexList rexDetails={userData.rexData} />
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

export default Consignments;
