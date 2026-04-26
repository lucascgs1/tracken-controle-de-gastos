import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FirebaseService } from '../../services/firebase.service';
import { AuthActions } from './auth.actions';
import { catchError, map, switchMap, tap, from, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '@tracken/shared';
import { AuthUser } from './auth.actions';

@Injectable()
export class AuthEffects {
	private actions$ = inject(Actions);
	private fb = inject(FirebaseService);
	private router = inject(Router);
	private toast = inject(ToastService);

	// MOCK: Always return success for login
	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.login),
			switchMap(() =>
				of(
					AuthActions.loginSuccess({
						user: {
							uid: 'demo-user',
							email: 'demo@tracken.com',
							displayName: 'Demo User',
							photoURL: null,
						} as AuthUser,
					}),
				),
			),
		),
	);

	loginSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.loginSuccess),
				tap(() => this.router.navigate(['/dashboard'])),
			),
		{ dispatch: false },
	);

	logout$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.logout),
			tap(() => this.router.navigate(['/auth/login'])),
			map(() => AuthActions.authStateChanged({ user: null })),
		),
	);

	// MOCK: Always provide a demo user on startup and redirect
	checkAuth$ = createEffect(() =>
		of(
			AuthActions.authStateChanged({
				user: {
					uid: 'demo-user',
					email: 'demo@tracken.com',
					displayName: 'Demo User',
					photoURL: null,
				} as AuthUser,
			}),
		).pipe(
			tap(() => {
				if (this.router.url.includes('/auth/login') || this.router.url === '/') {
					this.router.navigate(['/dashboard']);
				}
			}),
		),
	);

	updatePassword$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.updatePassword),
			switchMap(({ newPassword }) =>
				this.fb.updatePassword(newPassword).pipe(
					map(() => AuthActions.updatePasswordSuccess()),
					catchError((error) => of(AuthActions.updatePasswordFailure({ error: error.message }))),
				),
			),
		),
	);

	updatePasswordSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.updatePasswordSuccess),
				tap(() => {
					this.toast.show('settings.passwordChanged', 'success');
				}),
			),
		{ dispatch: false },
	);

	updatePasswordFailure$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.updatePasswordFailure),
				tap(({ error }) => {
					this.toast.show(error, 'error');
				}),
			),
		{ dispatch: false },
	);
}
