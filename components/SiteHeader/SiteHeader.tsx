import { useRouter } from 'next/router';
import { Logo } from '@ag.ds-next/react/ag-branding';
import { Header } from '@ag.ds-next/react/header';
import { MainNav } from '@ag.ds-next/react/main-nav';
import { Stack } from '@ag.ds-next/react/stack';

const NAV_LINKS = [{ label: 'Home', href: '/' }];

export const SiteHeader = () => {
	const router = useRouter();
	return (
		<Stack palette="dark">
			<Header
				background="bodyAlt"
				badgeLabel="Beta"
				heading="Agriculture Design System"
				logo={<Logo />}
				subline="Design System for the Export Service"
			/>
			<MainNav
				activePath={router.asPath}
				id="main-nav"
				items={NAV_LINKS}
				secondaryItems={[
					{
						label: 'Github',
						href: 'https://github.com/agriculturegovau/agds-next-starter-kit',
					},
				]}
			/>
		</Stack>
	);
};
