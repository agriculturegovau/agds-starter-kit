import { H1 } from '@ag.ds-next/heading';
import { Text } from '@ag.ds-next/text';
import { PageContent } from '@ag.ds-next/content';
import { AppLayout } from '../components/AppLayout';
import { DocumentTitle } from '../components/DocumentTitle';

function NotFoundPage() {
	return (
		<>
			<DocumentTitle title="Error 404" />
			<AppLayout>
				<PageContent>
					<H1>Error 404</H1>
					<Text as="p">We could not find this page.</Text>
				</PageContent>
			</AppLayout>
		</>
	);
}

export default NotFoundPage;
