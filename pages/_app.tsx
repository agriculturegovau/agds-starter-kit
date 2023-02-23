import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Core } from '@ag.ds-next/react/core';
import { theme } from '@ag.ds-next/react/ag-branding';
import { LinkComponent } from '../components/LinkComponent';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Core theme={theme} linkComponent={LinkComponent}>
			<Head>
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
				/>
				{/* Favicons - https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/ */}
				<link rel="icon" href="/favicon/favicon.ico" sizes="any" />
				<link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
				<link rel="manifest" href="/favicon/manifest.webmanifest" />
			</Head>
			<Component {...pageProps} />
		</Core>
	);
}

export default MyApp;
