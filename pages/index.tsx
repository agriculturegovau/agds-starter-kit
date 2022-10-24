import type { NextPage } from 'next';
import { Prose } from '@ag.ds-next/prose';
import { PageContent } from '@ag.ds-next/content';
import { AppLayout } from '../components/AppLayout';
import { DocumentTitle } from '../components/DocumentTitle';

const Home: NextPage = () => {
	return (
		<>
			<DocumentTitle title="Home" />
			<AppLayout>
				<PageContent>
					<Prose>
						<h1>AG Design System Starter Kit</h1>
						<p>
							This is a simple starter kit built using the AG Design System,
							NextJS and Typescript.
						</p>
						<p>
							For examples of common user interfaces, please refer to the{' '}
							<a
								href="https://steelthreads.github.io/agds-next/example-site/"
								target="_blank"
								rel="nofollow noreferrer"
							>
								example site
							</a>
						</p>
					</Prose>
				</PageContent>
			</AppLayout>
		</>
	);
};

export default Home;
