import type { StorybookConfig } from '@storybook/core-common';

const config: StorybookConfig = {
	stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-links',
		{ name: '@storybook/addon-essentials', options: { backgrounds: false } },
		'@storybook/addon-postcss',
		'storybook-addon-next-router',
	],
	framework: '@storybook/react',
	core: {
		builder: 'webpack5',
	},
	features: {
		/**
		 * Enable code splitting
		 * @see https://storybook.js.org/docs/react/builders/webpack#code-splitting
		 */
		storyStoreV7: true,
	},
	staticDirs: ['../public'],
};

export default config;
