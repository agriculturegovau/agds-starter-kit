import { useRouter } from "next/router";
import { Logo } from "@ag.ds-next/ag-branding";
import { Box, Flex, Stack } from "@ag.ds-next/box";
import { Header } from "@ag.ds-next/header";
import { MainNav, NavListItem, NavListLink } from "@ag.ds-next/main-nav";
import { Button } from "@ag.ds-next/button";
import Link from "next/link";
import {
  SearchBox,
  SearchBoxInput,
  SearchBoxButton,
} from "@ag.ds-next/search-box";

const NAV_LINKS: Array<NavListLink> = [
  { label: "Home", href: "/" },
  { label: "New exporters" },
  { label: "Export operations" },
  { label: "Updates and insights" },
  { label: "Contact us" },
];

export const SiteHeader = () => {
  const router = useRouter();
  return (
    <Stack>
      <Header
        variant="dark"
        logo={<Logo />}
        heading="Export Service"
        subline="Supporting Australian agricultural exports"
        badgeLabel="Alpha"
        rightContent={
          <SearchBox onSubmit={console.log}>
            <SearchBoxInput label="Search this website" />
            <SearchBoxButton
              iconOnly={{ xs: false, md: true, lg: false, xl: false }}
            >
              Search
            </SearchBoxButton>
          </SearchBox>
        }
      />
      <MainNav
        id="main-nav"
        variant="agriculture"
        links={NAV_LINKS}
        activePath={router.asPath}
        rightContent={
          <Flex gap={1} justifyContent="space-between" alignItems="flex-start">
            <Box>
              <NavListItem>
                <Link href="">Sign in</Link>
              </NavListItem>
            </Box>
            <Box paddingTop={0.25}>
              <Button variant="secondary" size="md">
                Create an account
              </Button>
            </Box>
          </Flex>
        }
      />
    </Stack>
  );
};
