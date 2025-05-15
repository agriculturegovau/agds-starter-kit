import { ReactNode } from 'react';
import { Box } from '@ag.ds-next/react/box';
import { Flex } from '@ag.ds-next/react/flex';
import { SkipLinks } from '@ag.ds-next/react/skip-link';
import { SiteHeader } from '../SiteHeader';
import { SiteFooter } from '../SiteFooter';

export const AppLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<SkipLinks
				links={[
					{ href: '#main-content', label: 'Skip to main content' },
					{ href: '#main-nav', label: 'Skip to main navigation' },
				]}
			/>
			<Flex
				flexDirection="column"
				fontFamily="body"
				minHeight="100vh"
				palette="light"
			>
				<SiteHeader />
				<Box as="main" flexGrow={1} id="main-content">
					{children}
				</Box>
				<SiteFooter />
			</Flex>
		</>
	);
};
