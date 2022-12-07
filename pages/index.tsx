import type { NextPage } from 'next';
import { DocumentTitle } from '../components/DocumentTitle';
import { HomePage } from '../components/HomePage';

const Home: NextPage = () => {
	return (
		<>
			<DocumentTitle title="Home" />
			<HomePage />
		</>
	);
};

export default Home;
