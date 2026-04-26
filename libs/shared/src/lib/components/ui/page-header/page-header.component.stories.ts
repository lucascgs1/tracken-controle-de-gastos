import type { Meta, StoryObj } from '@storybook/angular';
import { TrackenPageHeader } from './page-header.component';

const meta: Meta<TrackenPageHeader> = {
	component: TrackenPageHeader,
	title: 'UI/PageHeader',
};
export default meta;

type Story = StoryObj<TrackenPageHeader>;

export const Default: Story = {
	args: {
		title: 'Dashboard',
		showBackButton: false,
	},
};

export const WithBackButton: Story = {
	args: {
		title: 'Configurações',
		showBackButton: true,
	},
};
