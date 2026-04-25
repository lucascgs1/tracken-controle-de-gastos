import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TransactionsActions } from './transactions.actions';
import * as TransactionsSelectors from './transactions.selectors';
import { Transaction } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class TransactionsFacade {
  private store = inject(Store);

  allTransactions$ = this.store.select(TransactionsSelectors.selectAllTransactions);
  loaded$ = this.store.select(TransactionsSelectors.selectTransactionsLoaded);
  totalBalance$ = this.store.select(TransactionsSelectors.selectTotalBalance);
  incomeTotal$ = this.store.select(TransactionsSelectors.selectIncomeTotal);
  expenseTotal$ = this.store.select(TransactionsSelectors.selectExpenseTotal);
  categoryTotals$ = this.store.select(TransactionsSelectors.selectCategoryTotals);

  loadTransactions() {
    this.store.dispatch(TransactionsActions.loadTransactions());
  }

  addTransaction(transaction: Partial<Transaction>) {
    this.store.dispatch(TransactionsActions.addTransaction({ transaction }));
  }
}
