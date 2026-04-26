import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { categoriesFeature, categoriesAdapter } from './categories.reducer';
import { CategoriesActions } from './categories.actions';

@Injectable({ providedIn: 'root' })
export class CategoriesFacade {
	private store = inject(Store);

	// Observables
	loaded$ = this.store.select(categoriesFeature.selectLoaded);
	allCategories$ = this.store.select(
		categoriesAdapter.getSelectors(categoriesFeature.selectCategoriesState).selectAll,
	);

	// Signals
	loaded = toSignal(this.loaded$, { initialValue: false });
	allCategories = toSignal(this.allCategories$, { initialValue: [] });

	loadCategories() {
		this.store.dispatch(CategoriesActions.loadCategories());
	}
}
