import { authReducer, initialAuthState } from './auth.reducer';
import { AuthActions } from './auth.actions';
import { describe, it, expect } from 'vitest';

describe('Auth Reducer', () => {
	it('should return initial state', () => {
		const action = { type: 'Unknown' } as any;
		const state = authReducer(initialAuthState, action);
		expect(state).toBe(initialAuthState);
	});

	it('should set loading on login', () => {
		const action = AuthActions.login({ email: '', password: '' });
		const state = authReducer(initialAuthState, action);
		expect(state.loading).toBe(true);
	});

	it('should set user on loginSuccess', () => {
		const user = { uid: '1', email: 'test@test.com' };
		const action = AuthActions.loginSuccess({ user });
		const state = authReducer(initialAuthState, action);
		expect(state.user).toEqual(user);
		expect(state.loading).toBe(false);
	});

	it('should set error on loginFailure', () => {
		const error = 'Invalid';
		const action = AuthActions.loginFailure({ error });
		const state = authReducer(initialAuthState, action);
		expect(state.error).toBe(error);
		expect(state.loading).toBe(false);
	});

	it('should update user on authStateChanged', () => {
		const user = { uid: '2', email: 'changed@test.com' };
		const action = AuthActions.authStateChanged({ user });
		const state = authReducer(initialAuthState, action);
		expect(state.user).toEqual(user);
	});

	it('should clear user on logout', () => {
		const stateWithUser = { ...initialAuthState, user: { uid: '1', email: '' } };
		const action = AuthActions.logout();
		const state = authReducer(stateWithUser, action);
		expect(state.user).toBeNull();
	});
});
