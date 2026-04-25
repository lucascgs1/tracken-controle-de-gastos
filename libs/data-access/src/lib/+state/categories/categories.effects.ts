import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SeedService } from '../../services/seed.service';
import { CategoriesActions } from './categories.actions';
import { catchError, map, switchMap, of, take } from 'rxjs';

@Injectable()
export class CategoriesEffects {
  private actions$ = inject(Actions);
  private seedService = inject(SeedService);

  // MOCK: Return categories from SeedService
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      switchMap(() =>
        this.seedService.getMockData().pipe(
          take(1),
          map((data) => 
            CategoriesActions.loadCategoriesSuccess({ 
              categories: data.categories as any 
            })
          ),
          catchError((error) => 
            of(CategoriesActions.loadCategoriesFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
