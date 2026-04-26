import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { budgetsFeature, budgetsAdapter } from './budgets.reducer';
import { BudgetsActions } from './budgets.actions';

@Injectable({ providedIn: 'root' })
export class BudgetsFacade {
	private store = inject(Store);

	// Observables
	loaded$ = this.store.select(budgetsFeature.selectLoaded);
	allBudgets$ = this.store.select(
		budgetsAdapter.getSelectors(budgetsFeature.selectBudgetsState).selectAll,
	);

	// Signals
	loaded = toSignal(this.loaded$, { initialValue: false });
	allBudgets = toSignal(this.allBudgets$, { initialValue: [] });

	loadBudgets() {
		this.store.dispatch(BudgetsActions.loadBudgets());
	}
}
