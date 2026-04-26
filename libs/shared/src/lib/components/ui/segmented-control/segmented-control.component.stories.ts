import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { TrackenSegmentedControl } from './segmented-control.component';

const meta: Meta<TrackenSegmentedControl> = {
	component: TrackenSegmentedControl,
	title: 'UI/SegmentedControl',
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [FormsModule],
		}),
	],
	render: (args) => ({
		props: args,
		template: `
      <div style="max-width: 400px">
        <lib-tracken-segmented-control 
          [options]="options"
          [(ngModel)]="value">
        </lib-tracken-segmented-control>
        <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--text-dim)">Selecionado: {{ value | json }}</p>
      </div>
    `,
	}),
};
export default meta;

type Story = StoryObj<TrackenSegmentedControl & { value: string | number | boolean | null }>;

export const Default: Story = {
	args: {
		options: [
			{ label: 'Dia', value: 'day' },
			{ label: 'Mês', value: 'month' },
			{ label: 'Ano', value: 'year' },
		],
		value: 'month',
	},
};

export const Transactions: Story = {
	args: {
		options: [
			{ label: 'Todas', value: 'all' },
			{ label: 'Entradas', value: 'income' },
			{ label: 'Saídas', value: 'expense' },
		],
		value: 'all',
	},
};
