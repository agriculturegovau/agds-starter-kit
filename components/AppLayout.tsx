import { ReactNode } from "react";
import { Box, Flex } from "@ag.ds-next/box";
import { SkipLinks } from "@ag.ds-next/skip-link";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

type AppLayoutProps = {
  children: ReactNode;
  loggedIn?: boolean;
};

export const AppLayout = ({ children, loggedIn }: AppLayoutProps) => {
  return (
    <>
      <SkipLinks
        links={[
          { href: "#main-content", label: "Skip to main content" },
          { href: "#main-nav", label: "Skip to main navigation" },
        ]}
      />
      <Flex
        flexDirection="column"
        fontFamily="body"
        palette="light"
        minHeight="100vh"
      >
        <SiteHeader loggedIn={loggedIn} />
        <Box as="main" id="main-content" flexGrow={1}>
          {children}
        </Box>
        <SiteFooter />
      </Flex>
    </>
  );
};
