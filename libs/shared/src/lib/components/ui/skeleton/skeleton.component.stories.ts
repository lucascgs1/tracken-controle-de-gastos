import type { Meta, StoryObj } from '@storybook/angular';
import { TrackenSkeleton } from './skeleton.component';

const meta: Meta<TrackenSkeleton> = {
	component: TrackenSkeleton,
	title: 'UI/Skeleton',
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['text', 'circle', 'rect'],
		},
	},
};
export default meta;

type Story = StoryObj<TrackenSkeleton>;

export const Text: Story = {
	args: {
		variant: 'text',
		width: '200px',
		height: '1rem',
	},
};

export const Circle: Story = {
	args: {
		variant: 'circle',
		width: '50px',
		height: '50px',
	},
};

export const Rectangle: Story = {
	args: {
		variant: 'rect',
		width: '100%',
		height: '150px',
	},
};

export const CardSkeleton: Story = {
	render: () => ({
		template: `
      <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 1rem; width: 300px; display: flex; flex-direction: column; gap: 1rem">
        <div style="display: flex; align-items: center; gap: 1rem">
          <lib-tracken-skeleton variant="circle" width="40px" height="40px"></lib-tracken-skeleton>
          <div style="display: flex; flex-direction: column; gap: 0.5rem">
            <lib-tracken-skeleton variant="text" width="100px"></lib-tracken-skeleton>
            <lib-tracken-skeleton variant="text" width="60px"></lib-tracken-skeleton>
          </div>
        </div>
        <lib-tracken-skeleton variant="rect" width="100%" height="120px"></lib-tracken-skeleton>
      </div>
    `,
	}),
};
