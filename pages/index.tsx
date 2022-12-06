import type { NextPage } from 'next';
import { AppLayout } from '../components/AppLayout';
import { DocumentTitle } from '../components/DocumentTitle';
import { HomePage } from '../components/HomePage';

const Home: NextPage = () => {
	return (
		<>
			<DocumentTitle title="Home" />
			<AppLayout>
				<HomePage />
			</AppLayout>
		</>
	);
};

export default Home;
