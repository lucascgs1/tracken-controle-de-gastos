import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SeedService } from '../../services/seed.service';
import { TransactionsActions } from './transactions.actions';
import { catchError, map, switchMap, of, take } from 'rxjs';

@Injectable()
export class TransactionsEffects {
  private actions$ = inject(Actions);
  private seedService = inject(SeedService);

  // MOCK: Return data from SeedService instead of Firestore
  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.loadTransactions),
      switchMap(() =>
        this.seedService.getMockData().pipe(
          take(1),
          map((data) => 
            TransactionsActions.loadTransactionsSuccess({ 
              transactions: data.transactions as any 
            })
          ),
          catchError((error) => 
            of(TransactionsActions.loadTransactionsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.addTransaction),
      map(({ transaction }) => {
        const newTransaction = { 
          ...transaction, 
          id: Math.random().toString(36).substring(7),
          date: transaction.date || new Date().toISOString()
        };
        return TransactionsActions.addTransactionSuccess({ 
          transaction: newTransaction as any 
        });
      })
    )
  );
}
