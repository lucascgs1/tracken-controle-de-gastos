import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { budgetsFeature, budgetsAdapter } from './budgets.reducer';
import { BudgetsActions } from './budgets.actions';

@Injectable({ providedIn: 'root' })
export class BudgetsFacade {
  private store = inject(Store);

  loaded$ = this.store.select(budgetsFeature.selectLoaded);
  
  // Use adapter selectors with feature state
  allBudgets$ = this.store.select(
    budgetsAdapter.getSelectors(budgetsFeature.selectBudgetsState).selectAll
  );

  loadBudgets() {
    this.store.dispatch(BudgetsActions.loadBudgets());
  }
}
