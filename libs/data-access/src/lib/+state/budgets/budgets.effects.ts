import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SeedService } from '../../services/seed.service';
import { BudgetsActions } from './budgets.actions';
import { catchError, map, switchMap, of, take } from 'rxjs';

@Injectable()
export class BudgetsEffects {
  private actions$ = inject(Actions);
  private seedService = inject(SeedService);

  // MOCK: Return budgets from SeedService
  loadBudgets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetsActions.loadBudgets),
      switchMap(() =>
        this.seedService.getMockData().pipe(
          take(1),
          map((data) => 
            BudgetsActions.loadBudgetsSuccess({ 
              budgets: data.budgets as any 
            })
          ),
          catchError((error) => 
            of(BudgetsActions.loadBudgetsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
