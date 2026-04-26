import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { TransactionsActions } from './transactions.actions';
import * as TransactionsSelectors from './transactions.selectors';
import { Transaction } from '../../models';

@Injectable({
	providedIn: 'root',
})
export class TransactionsFacade {
	private store = inject(Store);

	// Observables (para uso com Pipes ou Reatividade Complexa)
	allTransactions$ = this.store.select(TransactionsSelectors.selectAllTransactions);
	loaded$ = this.store.select(TransactionsSelectors.selectTransactionsLoaded);
	totalBalance$ = this.store.select(TransactionsSelectors.selectTotalBalance);
	incomeTotal$ = this.store.select(TransactionsSelectors.selectIncomeTotal);
	expenseTotal$ = this.store.select(TransactionsSelectors.selectExpenseTotal);
	categoryTotals$ = this.store.select(TransactionsSelectors.selectCategoryTotals);

	// Signals (Para uso direto em Templates e UI - Senior Pattern)
	allTransactions = toSignal(this.allTransactions$, { initialValue: [] as Transaction[] });
	loaded = toSignal(this.loaded$, { initialValue: false });
	totalBalance = toSignal(this.totalBalance$, { initialValue: 0 });
	incomeTotal = toSignal(this.incomeTotal$, { initialValue: 0 });
	expenseTotal = toSignal(this.expenseTotal$, { initialValue: 0 });
	categoryTotals = toSignal(this.categoryTotals$, { initialValue: [] as any[] });

	loadTransactions() {
		this.store.dispatch(TransactionsActions.loadTransactions());
	}

	addTransaction(transaction: Partial<Transaction>) {
		this.store.dispatch(TransactionsActions.addTransaction({ transaction }));
	}

	deleteTransaction(id: string) {
		this.store.dispatch(TransactionsActions.deleteTransaction({ id }));
	}
}
