import { transactionsReducer, initialTransactionsState } from './transactions.reducer';
import { TransactionsActions } from './transactions.actions';
import { Transaction } from '../../models';
import { describe, it, expect } from 'vitest';

describe('Transactions Reducer', () => {
	it('should return the initial state', () => {
		const action = { type: 'Unknown' } as any;
		const state = transactionsReducer(initialTransactionsState, action);
		expect(state).toBe(initialTransactionsState);
	});

	it('should set loaded to false on loadTransactions', () => {
		const action = TransactionsActions.loadTransactions();
		const state = transactionsReducer(initialTransactionsState, action);
		expect(state.loaded).toBe(false);
	});

	it('should set all transactions on loadTransactionsSuccess', () => {
		const transactions: Transaction[] = [
			{ id: '1', amount: 100, description: 'Test', type: 'income', category: 'Salary', date: '' },
		];
		const action = TransactionsActions.loadTransactionsSuccess({ transactions });
		const state = transactionsReducer(initialTransactionsState, action);
		expect(state.ids).toHaveLength(1);
		expect(state.entities['1']).toEqual(transactions[0]);
		expect(state.loaded).toBe(true);
	});

	it('should set error on loadTransactionsFailure', () => {
		const error = 'Failed to load';
		const action = TransactionsActions.loadTransactionsFailure({ error });
		const state = transactionsReducer(initialTransactionsState, action);
		expect(state.error).toBe(error);
	});

	it('should add a transaction on addTransactionSuccess', () => {
		const transaction: Transaction = {
			id: '2',
			amount: 50,
			description: 'New',
			type: 'expense',
			category: 'Food',
			date: '',
		};
		const action = TransactionsActions.addTransactionSuccess({ transaction });
		const state = transactionsReducer(initialTransactionsState, action);
		expect(state.ids).toContain('2');
		expect(state.entities['2']).toEqual(transaction);
	});
});
