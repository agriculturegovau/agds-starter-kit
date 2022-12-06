import { AppLayout } from '.';

export default {
	title: 'Components/AppLayout',
	component: AppLayout,
};

export const Default = () => {
	return (
		<AppLayout>
			<h1>AppLayout</h1>
			<p>Some content</p>
		</AppLayout>
	);
};
