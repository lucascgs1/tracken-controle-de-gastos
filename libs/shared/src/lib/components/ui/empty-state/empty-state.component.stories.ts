import type { Meta, StoryObj } from '@storybook/angular';
import { TrackenEmptyState } from './empty-state.component';

const meta: Meta<TrackenEmptyState> = {
	component: TrackenEmptyState,
	title: 'UI/EmptyState',
	tags: ['autodocs'],
	argTypes: {
		actionClick: { action: 'clicked' },
	},
};
export default meta;

type Story = StoryObj<TrackenEmptyState>;

export const Default: Story = {
	args: {
		title: 'Nenhum resultado encontrado',
		description: 'Não conseguimos encontrar o que você está procurando.',
		icon: 'search_off',
	},
};

export const WithIllustration: Story = {
	args: {
		title: 'Sem transações recentes',
		description: 'Comece a economizar adicionando sua primeira transação hoje mesmo.',
		illustrationUrl: 'assets/images/empty-state.png',
		actionLabel: 'Adicionar Transação',
	},
};

export const CustomIcon: Story = {
	args: {
		title: 'Carteira vazia',
		description: 'Adicione uma conta ou cartão para começar a monitorar seus gastos.',
		icon: 'account_balance_wallet',
		actionLabel: 'Adicionar Conta',
	},
};
