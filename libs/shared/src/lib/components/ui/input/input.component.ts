import { Component, input, signal, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-tracken-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TrackenInput),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackenInput implements ControlValueAccessor {
  label = input<string>();
  type = input<string>('text');
  placeholder = input<string>('');
  error = input<string | null>();
  inputId = input<string>('input-' + Math.random().toString(36).substring(2, 9));

  value = signal<string | number | null>('');
  disabled = signal(false);

  private onChange: (value: string | number | null) => void = () => {
    // noop
  };
  private onTouched: () => void = () => {
    // noop
  };
  private cdr = inject(ChangeDetectorRef);

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const val = inputElement.value;
    this.value.set(val);
    this.onChange(val);
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
