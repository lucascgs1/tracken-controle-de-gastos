import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthFacade, FirebaseService } from '@tracken/data-access';
import { provideTrackenTransloco } from '@tracken/shared';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('App', () => {
	let authFacadeMock: any;
	let firebaseServiceMock: any;

	beforeEach(async () => {
		authFacadeMock = {
			user: signal(null),
			user$: of(null),
			loading$: of(false),
			error$: of(null),
			logout: vi.fn(),
		};

		firebaseServiceMock = {
			user$: of(null),
			login: vi.fn(),
			logout: vi.fn(),
		};

		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, App],
			providers: [
				provideMockStore({}),
				provideHttpClient(),
				provideHttpClientTesting(),
				provideTrackenTransloco(),
				{ provide: AuthFacade, useValue: authFacadeMock },
				{ provide: FirebaseService, useValue: firebaseServiceMock },
				// Fallback providers just in case
				{ provide: 'Auth', useValue: {} },
				{ provide: 'Firestore', useValue: {} },
			],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(App);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
