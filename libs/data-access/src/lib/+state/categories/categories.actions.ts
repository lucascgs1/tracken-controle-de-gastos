import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Category } from '../../models';

export const CategoriesActions = createActionGroup({
  source: 'Categories',
  events: {
    'Load Categories': emptyProps(),
    'Load Categories Success': props<{ categories: Category[] }>(),
    'Load Categories Failure': props<{ error: string }>(),
    'Add Category': props<{ category: Partial<Category> }>(),
    'Add Category Success': props<{ category: Category }>(),
    'Add Category Failure': props<{ error: string }>(),
  }
});
