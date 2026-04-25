import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Transaction } from '../../models';
import { TransactionsActions } from './transactions.actions';

export interface TransactionsState extends EntityState<Transaction> {
  loaded: boolean;
  error: string | null;
}

export const transactionsAdapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>();

export const initialTransactionsState: TransactionsState = transactionsAdapter.getInitialState({
  loaded: false,
  error: null,
});

export const transactionsReducer = createReducer(
  initialTransactionsState,
  on(TransactionsActions.loadTransactions, (state) => ({ ...state, loaded: false })),
  on(TransactionsActions.loadTransactionsSuccess, (state, { transactions }) => 
    transactionsAdapter.setAll(transactions, { ...state, loaded: true })
  ),
  on(TransactionsActions.loadTransactionsFailure, (state, { error }) => ({ ...state, error })),
  on(TransactionsActions.addTransactionSuccess, (state, { transaction }) => 
    transactionsAdapter.addOne(transaction, state)
  )
);
