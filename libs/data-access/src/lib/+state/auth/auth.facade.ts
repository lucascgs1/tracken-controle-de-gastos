import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthActions } from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable({
	providedIn: 'root',
})
export class AuthFacade {
	private store = inject(Store);

	// Observables
	user$ = this.store.select(AuthSelectors.selectUser);
	isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
	loading$ = this.store.select(AuthSelectors.selectAuthLoading);
	error$ = this.store.select(AuthSelectors.selectAuthError);

	// Signals
	user = toSignal(this.user$, { initialValue: null });
	isLoggedIn = toSignal(this.isLoggedIn$, { initialValue: false });
	loading = toSignal(this.loading$, { initialValue: false });
	error = toSignal(this.error$, { initialValue: null });

	login(email: string, pass: string) {
		this.store.dispatch(AuthActions.login({ email, pass }));
	}

	logout() {
		this.store.dispatch(AuthActions.logout());
	}

	checkAuth() {
		this.store.dispatch(AuthActions.checkAuth());
	}

	updatePassword(newPassword: string) {
		this.store.dispatch(AuthActions.updatePassword({ newPassword }));
	}
}
