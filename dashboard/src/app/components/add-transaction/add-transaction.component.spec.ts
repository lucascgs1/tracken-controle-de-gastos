import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTransactionComponent } from './add-transaction.component';
import { TransactionsFacade, CategoriesFacade, FirebaseService } from '@tracken/data-access';
import { provideTrackenTransloco } from '@tracken/shared';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { provideMockStore } from '@ngrx/store/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AddTransactionComponent', () => {
	let component: AddTransactionComponent;
	let fixture: ComponentFixture<AddTransactionComponent>;
	let transactionsFacadeMock: any;
	let categoriesFacadeMock: any;
	let firebaseServiceMock: any;

	beforeEach(async () => {
		vi.useFakeTimers();
		transactionsFacadeMock = {
			addTransaction: vi.fn(),
		};

		categoriesFacadeMock = {
			allCategories$: of([
				{ id: '1', name: 'Food', type: 'expense' },
				{ id: '2', name: 'Salary', type: 'income' },
			]),
		};

		firebaseServiceMock = {
			user$: of(null),
		};

		await TestBed.configureTestingModule({
			imports: [AddTransactionComponent],
			providers: [
				provideMockStore({}),
				provideHttpClient(),
				provideHttpClientTesting(),
				provideTrackenTransloco(),
				{ provide: TransactionsFacade, useValue: transactionsFacadeMock },
				{ provide: CategoriesFacade, useValue: categoriesFacadeMock },
				{ provide: FirebaseService, useValue: firebaseServiceMock },
				{ provide: 'Auth', useValue: {} },
				{ provide: 'Firestore', useValue: {} },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AddTransactionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should filter category options based on type', async () => {
		// Form default is expense
		expect(component.categoryOptions()).toHaveLength(1);
		expect(component.categoryOptions()[0].label).toBe('Food');

		// Change type to income
		component.transactionForm.patchValue({ type: 'income' });

		// Advance timers and detect changes for signals to react
		vi.advanceTimersByTime(100);
		fixture.detectChanges();
		await fixture.whenStable();

		expect(component.categoryOptions()).toHaveLength(1);
		expect(component.categoryOptions()[0].label).toBe('Salary');
	});

	it('should call addTransaction on valid submit', () => {
		component.transactionForm.patchValue({
			description: 'Dinner',
			amount: 50,
			categoryId: '1',
			type: 'expense',
			date: '2026-04-26',
		});

		component.onSubmit();
		expect(transactionsFacadeMock.addTransaction).toHaveBeenCalled();
	});
});
