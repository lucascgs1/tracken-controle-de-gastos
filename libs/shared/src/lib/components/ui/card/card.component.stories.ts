import type { Meta, StoryObj } from '@storybook/angular';
import { TrackenCard } from './card.component';

const meta: Meta<TrackenCard> = {
	component: TrackenCard,
	title: 'UI/Card',
	tags: ['autodocs'],
	render: (args) => ({
		props: args,
		template: `
      <lib-tracken-card [title]="title" [subtitle]="subtitle" [padding]="padding" [glass]="glass">
        <p style="color: var(--text-muted)">Este é o conteúdo interno do card. Você pode colocar qualquer elemento HTML ou componente aqui dentro.</p>
      </lib-tracken-card>
    `,
	}),
};
export default meta;

type Story = StoryObj<TrackenCard>;

export const Default: Story = {
	args: {
		title: 'Título do Card',
		subtitle: 'Subtítulo opcional para mais detalhes',
		padding: 'md',
		glass: false,
	},
};

export const Glass: Story = {
	args: {
		title: 'Efeito Glassmorphism',
		subtitle: 'Perfeito para dashboards modernos',
		glass: true,
	},
};

export const SmallPadding: Story = {
	args: {
		title: 'Card Compacto',
		padding: 'sm',
	},
};

export const WithoutHeader: Story = {
	args: {
		title: '',
		subtitle: '',
	},
};
