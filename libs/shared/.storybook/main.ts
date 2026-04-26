import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
	stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-links',
		'@storybook/addon-a11y',
		'@storybook/addon-themes',
	],
	framework: {
		name: '@storybook/angular',
		options: {},
	},
	staticDirs: ['../src/assets'],
};

export default config;
