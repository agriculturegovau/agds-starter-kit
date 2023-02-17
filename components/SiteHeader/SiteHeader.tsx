import { useRouter } from 'next/router';
import { Logo } from '@ag.ds-next/react/ag-branding';
import { Stack } from '@ag.ds-next/react/box';
import { Header } from '@ag.ds-next/react/header';
import { MainNav } from '@ag.ds-next/react/main-nav';

const NAV_LINKS = [{ label: 'Home', href: '/' }];

export const SiteHeader = () => {
	const router = useRouter();
	return (
		<Stack palette="dark">
			<Header
				background="bodyAlt"
				logo={<Logo />}
				heading="Agriculture Design System"
				subline="Design System for the Export Service"
				badgeLabel="Beta"
			/>
			<MainNav
				id="main-nav"
				items={NAV_LINKS}
				activePath={router.asPath}
				secondaryItems={[
					{
						label: 'Github',
						href: 'https://github.com/steelthreads/agds-next-starter-kit',
					},
				]}
			/>
		</Stack>
	);
};
