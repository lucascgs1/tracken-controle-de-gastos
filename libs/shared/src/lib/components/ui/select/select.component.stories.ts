import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { TrackenSelect } from './select.component';

const meta: Meta<TrackenSelect> = {
	component: TrackenSelect,
	title: 'UI/Select',
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [FormsModule],
		}),
	],
	render: (args) => ({
		props: args,
		template: `
      <div style="max-width: 400px; min-height: 300px">
        <lib-tracken-select 
          [label]="label" 
          [placeholder]="placeholder" 
          [options]="options"
          [error]="error"
          [(ngModel)]="value">
        </lib-tracken-select>
        <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--text-dim)">Selecionado: {{ value }}</p>
      </div>
    `,
	}),
};
export default meta;

type Story = StoryObj<TrackenSelect & { value: string | number | null }>;

export const Default: Story = {
	args: {
		label: 'Categoria',
		placeholder: 'Selecione uma categoria',
		options: [
			{ label: 'Alimentação', value: 'food' },
			{ label: 'Transporte', value: 'transport' },
			{ label: 'Saúde', value: 'health' },
			{ label: 'Lazer', value: 'leisure' },
		],
		value: '',
	},
};

export const WithValue: Story = {
	args: {
		...Default.args,
		value: 'transport',
	},
};

export const WithError: Story = {
	args: {
		...Default.args,
		error: 'Campo obrigatório',
	},
};
