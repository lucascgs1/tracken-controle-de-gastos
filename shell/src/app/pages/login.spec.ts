import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { provideMockStore } from '@ngrx/store/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthFacade, FirebaseService } from '@tracken/data-access';
import { provideTrackenTransloco } from '@tracken/shared';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let authFacadeMock: any;

	beforeEach(async () => {
		authFacadeMock = {
			user: signal(null),
			loading$: of(false),
			error$: of(null),
			login: vi.fn(),
		};

		const firebaseServiceMock = {
			login: vi.fn(),
			user$: of(null),
		};

		await TestBed.configureTestingModule({
			imports: [LoginComponent],
			providers: [
				provideMockStore({}),
				provideHttpClient(),
				provideHttpClientTesting(),
				provideTrackenTransloco(),
				{ provide: AuthFacade, useValue: authFacadeMock },
				{ provide: FirebaseService, useValue: firebaseServiceMock },
				{ provide: 'Auth', useValue: {} },
				{ provide: 'Firestore', useValue: {} },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have invalid form when empty', () => {
		expect(component.loginForm.valid).toBe(false);
	});

	it('should validate email format', () => {
		const email = component.loginForm.controls.email;
		email.setValue('invalid-email');
		expect(email.hasError('email')).toBe(true);

		email.setValue('test@test.com');
		expect(email.hasError('email')).toBe(false);
	});

	it('should call login on facade when form is valid', () => {
		component.loginForm.patchValue({
			email: 'test@test.com',
			password: 'password123',
		});

		component.onSubmit();
		expect(authFacadeMock.login).toHaveBeenCalledWith('test@test.com', 'password123');
	});

	it('should not call login on facade when form is invalid', () => {
		component.loginForm.patchValue({
			email: 'invalid',
			password: 'short',
		});

		component.onSubmit();
		expect(authFacadeMock.login).not.toHaveBeenCalled();
	});
});
