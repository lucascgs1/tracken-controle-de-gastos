import type { Meta, StoryObj } from '@storybook/angular';
import { TrackenButton } from './button.component';

const meta: Meta<TrackenButton> = {
	component: TrackenButton,
	title: 'UI/Button',
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'outline', 'ghost', 'danger'],
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
	},
	render: (args) => ({
		props: args,
		template: `<lib-tracken-button [variant]="variant" [size]="size" [loading]="loading" [disabled]="disabled">
      {{ label }}
    </lib-tracken-button>`,
	}),
};
export default meta;

type Story = StoryObj<TrackenButton & { label: string }>;

export const Primary: Story = {
	args: {
		label: 'Primary Button',
		variant: 'primary',
		size: 'md',
		loading: false,
		disabled: false,
	},
};

export const Outline: Story = {
	args: {
		label: 'Outline Button',
		variant: 'outline',
	},
};

export const Ghost: Story = {
	args: {
		label: 'Ghost Button',
		variant: 'ghost',
	},
};

export const Danger: Story = {
	args: {
		label: 'Danger Button',
		variant: 'danger',
	},
};

export const Loading: Story = {
	args: {
		label: 'Loading...',
		loading: true,
	},
};

export const Small: Story = {
	args: {
		label: 'Small Button',
		size: 'sm',
	},
};

export const Large: Story = {
	args: {
		label: 'Large Button',
		size: 'lg',
	},
};
