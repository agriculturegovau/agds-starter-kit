import { Logo, theme } from "@ag.ds-next/ag-branding";
import styled from "@emotion/styled";
import { Heading } from "@ag.ds-next/heading";
import { NextPage } from "next";
import { Box, Flex, Stack } from "@ag.ds-next/box";
import { Text, TextLink } from "@ag.ds-next/text";

const Aside = styled(Box)`
  padding: 5em 2em;
  @media (min-width: 768px) {
    text-align: center;
  }
`;

const Contents = styled(Box)`
  padding: 5em 2em;
  grid-area: contents;
`;

const Main = styled.main`
  min-height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas:
    "logo"
    "contents";
  grid-template-rows: auto 2fr;
  & > * {
    padding: 2rem;
  }
  @media (min-width: 768px) {
    grid-template-areas: "logo contents";
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto;
    & > * {
      padding: 4rem;
    }
  }
`;

const prototypes = [
  { url: "self-manage", label: "Self Manage Portal" },
  // { url: "sample", label: "Sample" },
  // { url: "splash", label: "Splash Page" },
  // { url: "matrix", label: "Options Matrix" },
];

const Home: NextPage = () => (
  <Flex palette="dark">
    <Main id="content">
      <Aside background="shade" color="text" alignItems="flex-start">
        <Logo />
      </Aside>

      <Contents background="body" flexDirection="column">
        <Heading as="h2" fontSize="xxxl">
          Contents
        </Heading>

        <hr />

        <Flex color="text" gap={2} flexDirection="column">
          <Text as="p">This is an alpha prototype.</Text>
          <Text as="p">
            It&apos;s designed to capture key interactions in the tranche 1 view
            of the agricultural export experience with the department.
          </Text>
          <Text as="p">
            We&apos;ll continue to expand on and evolve the prototype, to define
            reusable patterns to support a simple, intuitive service that meets
            user needs.
          </Text>
        </Flex>

        <Stack color="text" gap={2} paddingTop={3} flexDirection="column">
          {prototypes.map(({ label, url }) => (
            <TextLink key={url} href={`/${url}`}>
              {label}
            </TextLink>
          ))}
        </Stack>
      </Contents>
    </Main>
  </Flex>
);

export default Home;
