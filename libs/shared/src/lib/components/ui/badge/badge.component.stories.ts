import type { Meta, StoryObj } from '@storybook/angular';
import { TrackenBadge } from './badge.component';

const meta: Meta<TrackenBadge> = {
	component: TrackenBadge,
	title: 'UI/Badge',
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'success', 'warning', 'danger', 'info', 'ghost'],
		},
	},
	render: (args) => ({
		props: args,
		template: `<lib-tracken-badge [variant]="variant">{{ label }}</lib-tracken-badge>`,
	}),
};
export default meta;

type Story = StoryObj<TrackenBadge & { label: string }>;

export const Primary: Story = {
	args: {
		label: 'Primary',
		variant: 'primary',
	},
};

export const Success: Story = {
	args: {
		label: 'Success',
		variant: 'success',
	},
};

export const Danger: Story = {
	args: {
		label: 'Danger',
		variant: 'danger',
	},
};

export const Warning: Story = {
	args: {
		label: 'Warning',
		variant: 'warning',
	},
};

export const Ghost: Story = {
	args: {
		label: 'Ghost Badge',
		variant: 'ghost',
	},
};
