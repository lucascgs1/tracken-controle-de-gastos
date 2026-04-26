import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '@angular/fire/auth';

export interface AuthUser {
	uid: string;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
}

export const AuthActions = createActionGroup({
	source: 'Auth',
	events: {
		Login: props<{ email: string; pass: string }>(),
		'Login Success': props<{ user: AuthUser }>(),
		'Login Failure': props<{ error: string }>(),
		Logout: emptyProps(),
		'Check Auth': emptyProps(),
		'Auth State Changed': props<{ user: AuthUser | null }>(),
		'Update Password': props<{ newPassword: string }>(),
		'Update Password Success': emptyProps(),
		'Update Password Failure': props<{ error: string }>(),
	},
});
