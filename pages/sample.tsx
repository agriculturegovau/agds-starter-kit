import type { NextPage } from "next";
import { Body } from "@ag.ds-next/body";
import { Content } from "@ag.ds-next/content";
import { AppLayout } from "../components/AppLayout";
import { DocumentTitle } from "../components/DocumentTitle";

const Home: NextPage = () => {
  return (
    <>
      <DocumentTitle title="Home" />
      <AppLayout>
        <Content>
          <Body>
            <h1>Sample Page</h1>
            <p>
              This is a sample page using the AG Design System. It&apos;s a good
              place to play around with concepts if you don't want to spin up a
              new page.
            </p>
          </Body>
        </Content>
      </AppLayout>
    </>
  );
};

export default Home;
