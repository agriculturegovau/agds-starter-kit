import { AppLayout } from '.';

const meta = {
	title: 'Components/AppLayout',
	component: AppLayout,
};

export default meta;

export const Default = () => {
	return (
		<AppLayout>
			<h1>AppLayout</h1>
			<p>Some content</p>
		</AppLayout>
	);
};
