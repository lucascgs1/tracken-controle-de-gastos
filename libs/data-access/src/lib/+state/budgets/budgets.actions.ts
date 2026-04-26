import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Budget } from '../../models';

export const BudgetsActions = createActionGroup({
	source: 'Budgets',
	events: {
		'Load Budgets': emptyProps(),
		'Load Budgets Success': props<{ budgets: Budget[] }>(),
		'Load Budgets Failure': props<{ error: string }>(),
		'Update Budget': props<{ budget: Budget }>(),
		'Update Budget Success': props<{ budget: Budget }>(),
		'Update Budget Failure': props<{ error: string }>(),
	},
});
