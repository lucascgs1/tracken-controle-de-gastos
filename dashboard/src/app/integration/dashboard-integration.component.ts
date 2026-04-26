import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CurrencyPipe, CommonModule } from '@angular/common';
import {
	TransactionsFacade,
	AuthFacade,
	SeedService,
	CategoriesFacade,
	BudgetsFacade,
} from '@tracken/data-access';
import { TrackenButton, TrackenCard, TrackenBadge, TrackenSkeleton } from '@tracken/shared';
import { take } from 'rxjs';
import { AddTransactionComponent } from '../components/add-transaction/add-transaction.component';
import { SpendingChartComponent } from '../components/spending-chart/spending-chart.component';
import { TranslocoDirective } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-dashboard-integration',
	standalone: true,
	imports: [
		CommonModule,
		CurrencyPipe,
		TrackenButton,
		TrackenCard,
		TrackenBadge,
		TrackenSkeleton,
		AddTransactionComponent,
		SpendingChartComponent,
		TranslocoDirective,
	],
	templateUrl: './dashboard-integration.component.html',
	styleUrl: './dashboard-integration.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardIntegrationComponent implements OnInit {
	private transactionsFacade = inject(TransactionsFacade);
	private authFacade = inject(AuthFacade);
	private seedService = inject(SeedService);
	private categoriesFacade = inject(CategoriesFacade);
	private budgetsFacade = inject(BudgetsFacade);

	// Estado Local com Signals
	showAddModal = signal(false);

	// Conversão de Observables do Facade para Signals (Reatividade Fina)
	transactions = toSignal(this.transactionsFacade.allTransactions$, { initialValue: [] });
	loaded = toSignal(this.transactionsFacade.loaded$, { initialValue: false });
	totalBalance = toSignal(this.transactionsFacade.totalBalance$, { initialValue: 0 });
	incomeTotal = toSignal(this.transactionsFacade.incomeTotal$, { initialValue: 0 });
	expenseTotal = toSignal(this.transactionsFacade.expenseTotal$, { initialValue: 0 });
	categories = toSignal(this.categoriesFacade.allCategories$, { initialValue: [] });
	categoryTotals = toSignal(this.transactionsFacade.categoryTotals$, { initialValue: [] });

	ngOnInit() {
		this.transactionsFacade.loadTransactions();
		this.categoriesFacade.loadCategories();
		this.budgetsFacade.loadBudgets();
	}

	onSeed() {
		this.authFacade.user$.pipe(take(1)).subscribe((user) => {
			const userId = user?.uid ?? 'demo-user';
			this.seedService.seedData(userId);
		});
	}

	onAddTransaction() {
		this.showAddModal.set(true);
	}
}
