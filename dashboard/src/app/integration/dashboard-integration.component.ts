import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CurrencyPipe, AsyncPipe } from '@angular/common';
import {
  TransactionsFacade,
  AuthFacade,
  SeedService,
  CategoriesFacade,
  BudgetsFacade,
} from '@tracken/data-access';
import { TrackenButton } from '@tracken/shared';
import { take } from 'rxjs';
import { AddTransactionComponent } from '../components/add-transaction/add-transaction.component';
import { SpendingChartComponent } from '../components/spending-chart/spending-chart.component';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-dashboard-integration',
  standalone: true,
  imports: [CurrencyPipe, AsyncPipe, TrackenButton, AddTransactionComponent, SpendingChartComponent, TranslocoDirective],
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

  showAddModal = signal(false);

  transactions$ = this.transactionsFacade.allTransactions$;
  loaded$ = this.transactionsFacade.loaded$;
  totalBalance$ = this.transactionsFacade.totalBalance$;
  incomeTotal$ = this.transactionsFacade.incomeTotal$;
  expenseTotal$ = this.transactionsFacade.expenseTotal$;
  categories$ = this.categoriesFacade.allCategories$;
  budgets$ = this.budgetsFacade.allBudgets$;
  categoryTotals$ = this.transactionsFacade.categoryTotals$;

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
