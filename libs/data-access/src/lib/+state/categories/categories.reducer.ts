import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, createFeature } from '@ngrx/store';
import { Category } from '../../models';
import { CategoriesActions } from './categories.actions';

export const CATEGORIES_FEATURE_KEY = 'categories';

export interface CategoriesState extends EntityState<Category> {
  loaded: boolean;
  error: string | null;
}

export const categoriesAdapter: EntityAdapter<Category> = createEntityAdapter<Category>();

export const initialCategoriesState: CategoriesState = categoriesAdapter.getInitialState({
  loaded: false,
  error: null,
});

export const categoriesFeature = createFeature({
  name: CATEGORIES_FEATURE_KEY,
  reducer: createReducer(
    initialCategoriesState,
    on(CategoriesActions.loadCategories, (state) => ({
      ...state,
      loaded: false,
      error: null,
    })),
    on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) =>
      categoriesAdapter.setAll(categories, { ...state, loaded: true })
    ),
    on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({
      ...state,
      error,
    }))
  ),
});
