import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { TrackenInput } from './input.component';

const meta: Meta<TrackenInput> = {
	component: TrackenInput,
	title: 'UI/Input',
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [FormsModule],
		}),
	],
	render: (args) => ({
		props: {
			...args,
			internalValue: '',
		},
		template: `
      <div style="max-width: 400px">
        <lib-tracken-input 
          [label]="label" 
          [type]="type" 
          [placeholder]="placeholder" 
          [error]="error"
          [(ngModel)]="internalValue">
        </lib-tracken-input>
        <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--text-dim)">Valor atual: {{ internalValue }}</p>
      </div>
    `,
	}),
};
export default meta;

type Story = StoryObj<TrackenInput>;

export const Default: Story = {
	args: {
		label: 'Nome Completo',
		placeholder: 'Ex: Lucas Coutinho',
	},
};

export const Password: Story = {
	args: {
		label: 'Sua Senha',
		type: 'password',
		placeholder: '••••••••',
	},
};

export const WithError: Story = {
	args: {
		label: 'E-mail',
		placeholder: 'usuario@email.com',
		error: 'Por favor, insira um e-mail válido.',
	},
};

export const Disabled: Story = {
	args: {
		label: 'Campo Desabilitado',
	},
};
