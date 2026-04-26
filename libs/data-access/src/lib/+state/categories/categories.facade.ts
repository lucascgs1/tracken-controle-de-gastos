import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { categoriesFeature, categoriesAdapter } from './categories.reducer';
import { CategoriesActions } from './categories.actions';

@Injectable({ providedIn: 'root' })
export class CategoriesFacade {
	private store = inject(Store);

	loaded$ = this.store.select(categoriesFeature.selectLoaded);

	// Use adapter selectors with feature state
	allCategories$ = this.store.select(
		categoriesAdapter.getSelectors(categoriesFeature.selectCategoriesState).selectAll,
	);

	loadCategories() {
		this.store.dispatch(CategoriesActions.loadCategories());
	}
}
