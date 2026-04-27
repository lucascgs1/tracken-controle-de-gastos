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
import { signal, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { vi, describe, it, expect, beforeEach } from 'vitest';

@Component({
	selector: 'app-add-transaction',
	standalone: true,
	template: '',
})
class MockAddTransactionComponent {}

describe('DashboardIntegrationComponent', () => {
	beforeEach(async () => {
		const authFacadeMock = {
			user: signal({ uid: '1' }),
			user$: of({ uid: '1' }),
			loading$: of(false),
			error$: of(null),
		};

		const transactionsFacadeMock = {
			transactions$: of([]),
			loading$: of(false),
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
				{ provide: CategoriesFacade, useValue: { allCategories$: of([]) } },
				{ provide: BudgetsFacade, useValue: { allBudgets$: of([]) } },
				{ provide: FirebaseService, useValue: { user$: of(null) } },
				{ provide: 'Auth', useValue: {} },
				{ provide: 'Firestore', useValue: {} },
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();
	});

	it('should create', () => {
		const fixture = TestBed.createComponent(DashboardIntegrationComponent);
		expect(fixture.componentInstance).toBeTruthy();
	});
});
