import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, createFeature } from '@ngrx/store';
import { Budget } from '../../models';
import { BudgetsActions } from './budgets.actions';

export const BUDGETS_FEATURE_KEY = 'budgets';

export interface BudgetsState extends EntityState<Budget> {
  loaded: boolean;
  error: string | null;
}

export const budgetsAdapter: EntityAdapter<Budget> = createEntityAdapter<Budget>();

export const initialBudgetsState: BudgetsState = budgetsAdapter.getInitialState({
  loaded: false,
  error: null,
});

export const budgetsFeature = createFeature({
  name: BUDGETS_FEATURE_KEY,
  reducer: createReducer(
    initialBudgetsState,
    on(BudgetsActions.loadBudgets, (state) => ({
      ...state,
      loaded: false,
      error: null,
    })),
    on(BudgetsActions.loadBudgetsSuccess, (state, { budgets }) =>
      budgetsAdapter.setAll(budgets, { ...state, loaded: true })
    ),
    on(BudgetsActions.loadBudgetsFailure, (state, { error }) => ({
      ...state,
      error,
    }))
  ),
});
