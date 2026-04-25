import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FirebaseService } from '../../services/firebase.service';
import { AuthActions } from './auth.actions';
import { catchError, map, switchMap, tap, from, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private fb = inject(FirebaseService);
  private router = inject(Router);

  // MOCK: Always return success for login
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(() => 
        of(AuthActions.loginSuccess({ 
          user: { uid: 'demo-user', email: 'demo@tracken.com', displayName: 'Demo User' } as any 
        }))
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => this.router.navigate(['/dashboard']))
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => this.router.navigate(['/auth/login'])),
      map(() => AuthActions.authStateChanged({ user: null }))
    )
  );

  // MOCK: Always provide a demo user on startup and redirect
  checkAuth$ = createEffect(() =>
    of(AuthActions.authStateChanged({ 
      user: { uid: 'demo-user', email: 'demo@tracken.com', displayName: 'Demo User' } as any 
    })).pipe(
      tap(() => {
        if (this.router.url.includes('/auth/login') || this.router.url === '/') {
          this.router.navigate(['/dashboard']);
        }
      })
    )
  );
}
