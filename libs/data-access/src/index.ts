import {
  EnvironmentProviders,
  makeEnvironmentProviders,
} from '@angular/core';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './lib/+state/auth/auth.reducer';
import { AuthEffects } from './lib/+state/auth/auth.effects';
import { transactionsReducer } from './lib/+state/transactions/transactions.reducer';
import { TransactionsEffects } from './lib/+state/transactions/transactions.effects';
import { categoriesFeature } from './lib/+state/categories/categories.reducer';
import { CategoriesEffects } from './lib/+state/categories/categories.effects';
import { budgetsFeature } from './lib/+state/budgets/budgets.reducer';
import { BudgetsEffects } from './lib/+state/budgets/budgets.effects';
import { initializeApp, provideFirebaseApp, getApp, getApps } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// Facades
export * from './lib/+state/auth/auth.facade';
export * from './lib/+state/transactions/transactions.facade';
export * from './lib/+state/categories/categories.facade';
export * from './lib/+state/budgets/budgets.facade';
// Services
export * from './lib/services/firebase.service';
export * from './lib/services/seed.service';
// Guards
export * from './lib/guards/auth.guard';
// Models
export * from './lib/models';

export interface DataAccessOptions {
  isRemote?: boolean;
}

/**
 * Provides Data Access services for the Tracken platform.
 * In a Shell application, it initializes Firebase and the global Store.
 * In a Remote MFE, it should be called with { isRemote: true } to avoid re-initializing core services,
 * unless running in standalone mode.
 */
export function provideDataAccess(
  firebaseConfig: any,
  options: DataAccessOptions = {}
): EnvironmentProviders {
  const providers: any[] = [
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideState('auth', authReducer),
    provideState('transactions', transactionsReducer),
    provideState(categoriesFeature),
    provideState(budgetsFeature),
    provideEffects(AuthEffects, TransactionsEffects, CategoriesEffects, BudgetsEffects),
  ];

  // Only provide core infrastructure if not a remote or if specifically needed for standalone
  if (!options.isRemote) {
    providers.push(
      provideFirebaseApp(() => {
        // Safe initialization: check if apps already exist
        return getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
      }),
      provideStore()
    );
  }

  return makeEnvironmentProviders(providers);
}
