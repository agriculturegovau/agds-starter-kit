import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
	stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],

	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-links',
		{
			name: '@storybook/addon-essentials',
			options: {
				backgrounds: false,
			},
		},
	],

	framework: {
		name: '@storybook/nextjs',
		options: {},
	},

	features: {},

	staticDirs: ['../public'],

	docs: {},

	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
};

export default config;
