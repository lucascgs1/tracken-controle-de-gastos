import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionsState, transactionsAdapter } from './transactions.reducer';

export const selectTransactionsState = createFeatureSelector<TransactionsState>('transactions');

const { selectAll, selectEntities } = transactionsAdapter.getSelectors();

export const selectAllTransactions = createSelector(selectTransactionsState, selectAll);

export const selectTransactionsLoaded = createSelector(
	selectTransactionsState,
	(state) => state.loaded,
);

export const selectTotalBalance = createSelector(selectAllTransactions, (transactions) =>
	transactions.reduce((acc, t) => (t.type === 'income' ? acc + t.amount : acc - t.amount), 0),
);

export const selectIncomeTotal = createSelector(selectAllTransactions, (transactions) =>
	transactions.filter((t) => t.type === 'income').reduce((acc, t) => acc + t.amount, 0),
);

export const selectExpenseTotal = createSelector(selectAllTransactions, (transactions) =>
	transactions.filter((t) => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0),
);

export const selectCategoryTotals = createSelector(selectAllTransactions, (transactions) => {
	const totals: { [key: string]: number } = {};
	transactions
		.filter((t) => t.type === 'expense')
		.forEach((t) => {
			totals[t.category] = (totals[t.category] || 0) + t.amount;
		});
	return Object.entries(totals).map(([name, value]) => ({ name, value }));
});
