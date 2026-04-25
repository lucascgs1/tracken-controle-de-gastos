import { Component, inject, output, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionsFacade, CategoriesFacade } from '@tracken/data-access';
import { 
  TrackenButton, 
  TrackenModal, 
  TrackenInput, 
  TrackenSelect, 
  TrackenMoneyInput, 
  SelectOption 
} from '@tracken/shared';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    TrackenButton, 
    TrackenModal, 
    TrackenInput, 
    TrackenSelect, 
    TrackenMoneyInput, 
    TranslocoDirective
  ],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionComponent {
  private transactionsFacade = inject(TransactionsFacade);
  private categoriesFacade = inject(CategoriesFacade);

  closeModal = output<void>();

  categories = toSignal(this.categoriesFacade.allCategories$, { initialValue: [] });
  
  transactionForm = new FormGroup({
    type: new FormControl<'income' | 'expense'>('expense', { nonNullable: true }),
    description: new FormControl('', [Validators.required]),
    amount: new FormControl<number>(0, [Validators.required, Validators.min(0.01)]),
    date: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
  });

  type = toSignal(this.transactionForm.controls.type.valueChanges, { initialValue: 'expense' });

  categoryOptions = computed<SelectOption[]>(() => 
    this.categories()
      .filter(c => c.type === this.type())
      .map(c => ({ label: c.name, value: c.id ?? '' }))
  );

  onSubmit() {
    if (this.transactionForm.valid) {
      const val = this.transactionForm.getRawValue();
      const category = this.categories().find(c => c.id === val.categoryId);
      
      this.transactionsFacade.addTransaction({
        description: val.description ?? '',
        amount: val.amount ?? 0,
        category: category?.name ?? 'General',
        type: val.type as 'income' | 'expense',
        date: new Date(val.date ?? new Date()).toISOString(),
      });
      
      this.closeModal.emit();
    }
  }
}
