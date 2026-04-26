import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SeedService } from '../../services/seed.service';
import { TransactionsActions } from './transactions.actions';
import { catchError, map, switchMap, of, take } from 'rxjs';
import { Transaction } from '../../models';

@Injectable()
export class TransactionsEffects {
	private actions$ = inject(Actions);
	private seedService = inject(SeedService);

	// Implementação mais robusta e tipada (Senior Standard)
	loadTransactions$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TransactionsActions.loadTransactions),
			switchMap(() =>
				this.seedService.getMockData().pipe(
					take(1),
					map((data) =>
						TransactionsActions.loadTransactionsSuccess({
							transactions: data.transactions as Transaction[],
						}),
					),
					catchError((error) =>
						of(TransactionsActions.loadTransactionsFailure({ error: error.message })),
					),
				),
			),
		),
	);

	addTransaction$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TransactionsActions.addTransaction),
			map(({ transaction }) => {
				const newTransaction: Transaction = {
					id: Math.random().toString(36).substring(7),
					description: transaction.description || '',
					amount: transaction.amount || 0,
					category: transaction.category || 'Other',
					type: transaction.type || 'expense',
					date: transaction.date || new Date().toISOString(),
					userId: 'current-user', // Idealmente pegaria do seletor do Auth
				};
				return TransactionsActions.addTransactionSuccess({
					transaction: newTransaction,
				});
			}),
		),
	);
}
