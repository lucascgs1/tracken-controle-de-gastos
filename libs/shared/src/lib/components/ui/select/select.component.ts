import { Component, input, signal, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, inject, HostListener, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'lib-tracken-select',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TrackenSelect),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackenSelect implements ControlValueAccessor {
  label = input<string>();
  placeholder = input<string>();
  options = input<SelectOption[]>([]);
  error = input<string | null>();
  inputId = input<string>('select-' + Math.random().toString(36).substring(2, 9));

  value = signal<string | number | null>('');
  disabled = signal(false);
  isOpen = signal(false);

  selectedLabel = computed(() => {
    const val = this.value();
    return this.options().find(opt => opt.value === val)?.label || '';
  });

  private onChange: (value: string | number | null) => void = () => {
    // noop
  };
  private onTouched: () => void = () => {
    // noop
  };
  private cdr = inject(ChangeDetectorRef);

  @HostListener('document:click')
  close() {
    this.isOpen.set(false);
  }

  toggle() {
    if (!this.disabled()) {
      this.isOpen.update(v => !v);
    }
  }

  selectOption(option: SelectOption) {
    this.value.set(option.value);
    this.onChange(option.value);
    this.isOpen.set(false);
    this.onTouched();
  }

  onBlur() {
    this.onTouched();
  }

  writeValue(value: string | number | null): void {
    this.value.set(value);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
    this.cdr.markForCheck();
  }
}
