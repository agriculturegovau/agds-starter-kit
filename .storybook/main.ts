module.exports = {
	stories: [
		'../components/**/*.stories.@(js|jsx|ts|tsx)',
		'../stories/**/*.stories.@(mdx|js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5',
	},
};
