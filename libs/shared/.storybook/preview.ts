import { Preview, componentWrapperDecorator } from '@storybook/angular';

export const decorators = [
	componentWrapperDecorator((story) => `<div class="story-wrapper">${story}</div>`),
];

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	globalTypes: {
		theme: {
			name: 'Theme',
			description: 'Global theme for components',
			defaultValue: 'light',
			toolbar: {
				icon: 'circlehollow',
				items: [
					{ value: 'light', icon: 'circlehollow', title: 'Light' },
					{ value: 'dark', icon: 'circle', title: 'Dark' },
					{ value: 'midnight', icon: 'moon', title: 'Midnight' },
				],
				showName: true,
			},
		},
	},
};

export const loaders = [
	async ({ globals }: { globals: Record<string, string | undefined> }) => {
		const theme = globals['theme'] || 'light';
		document.documentElement.setAttribute('data-theme', theme);
		return {};
	},
];

export default preview;
