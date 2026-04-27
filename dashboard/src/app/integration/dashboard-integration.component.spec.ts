import { TestBed } from '@angular/core/testing';
import { DashboardIntegrationComponent } from './dashboard-integration.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
	AuthFacade,
	TransactionsFacade,
	CategoriesFacade,
	BudgetsFacade,
	FirebaseService,
} from '@tracken/data-access';
import { provideTrackenTransloco } from '@tracken/shared';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('DashboardIntegrationComponent', () => {
	beforeEach(async () => {
		const authFacadeMock = {
			user: signal(null),
			user$: of(null),
			loading$: of(false),
			error$: of(null),
		};

		const transactionsFacadeMock = {
			transactions: signal([]),
			loading: signal(false),
		};

		const categoriesFacadeMock = {
			categories: signal([]),
		};

		const budgetsFacadeMock = {
			budgets: signal([]),
		};

		const firebaseServiceMock = {
			user$: of(null),
		};

		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, DashboardIntegrationComponent],
			providers: [
				provideMockStore({}),
				provideHttpClient(),
				provideHttpClientTesting(),
				provideTrackenTransloco(),
				{ provide: AuthFacade, useValue: authFacadeMock },
				{ provide: TransactionsFacade, useValue: transactionsFacadeMock },
				{ provide: CategoriesFacade, useValue: categoriesFacadeMock },
				{ provide: BudgetsFacade, useValue: budgetsFacadeMock },
				{ provide: FirebaseService, useValue: firebaseServiceMock },
				{ provide: 'Auth', useValue: {} },
				{ provide: 'Firestore', useValue: {} },
			],
		}).compileComponents();
	});

	it('should create', () => {
		const fixture = TestBed.createComponent(DashboardIntegrationComponent);
		const component = fixture.componentInstance;
		expect(component).toBeTruthy();
	});
});
