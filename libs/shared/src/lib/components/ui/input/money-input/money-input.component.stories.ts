import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { TrackenMoneyInput } from './money-input.component';

const meta: Meta<TrackenMoneyInput> = {
	component: TrackenMoneyInput,
	title: 'UI/MoneyInput',
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [FormsModule],
		}),
	],
	render: (args) => ({
		props: {
			...args,
			internalValue: 0,
		},
		template: `
      <div style="max-width: 400px">
        <lib-tracken-money-input 
          [label]="label" 
          [placeholder]="placeholder" 
          [error]="error"
          [(ngModel)]="internalValue">
        </lib-tracken-money-input>
        <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--text-dim)">Valor numérico: {{ internalValue }}</p>
      </div>
    `,
	}),
};
export default meta;

type Story = StoryObj<TrackenMoneyInput>;

export const Default: Story = {
	args: {
		label: 'Valor da Transação',
		placeholder: '0,00',
	},
};

export const WithError: Story = {
	args: {
		label: 'Orçamento',
		placeholder: '0,00',
		error: 'O valor não pode ser negativo.',
	},
};
