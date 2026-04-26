import {
	Component,
	input,
	signal,
	forwardRef,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	inject,
} from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';

@Component({
	selector: 'lib-tracken-money-input',
	standalone: true,
	imports: [CommonModule, FormsModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TrackenMoneyInput),
			multi: true,
		},
		CurrencyPipe,
	],
	templateUrl: './money-input.component.html',
	styleUrl: './money-input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackenMoneyInput implements ControlValueAccessor {
	label = input<string>();
	placeholder = input<string>('0.00');
	error = input<string | null>();
	inputId = input<string>('money-' + Math.random().toString(36).substring(2, 9));

	formattedValue = signal<string>('');
	numericValue = signal<number>(0);
	disabled = signal(false);

	private onChange: (value: number) => void = () => {
		// noop
	};
	private onTouched: () => void = () => {
		// noop
	};
	private cdr = inject(ChangeDetectorRef);

	onInput(event: Event) {
		const inputElement = event.target as HTMLInputElement;
		const val = inputElement.value.replace(/[^0-9]/g, '');

		if (!val) {
			this.numericValue.set(0);
			this.formattedValue.set('');
			this.onChange(0);
			return;
		}

		const numeric = parseFloat(val) / 100;
		this.numericValue.set(numeric);
		this.formattedValue.set(this.format(numeric));
		this.onChange(numeric);
	}

	private format(val: number): string {
		return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	}

	onBlur() {
		this.onTouched();
	}

	writeValue(value: number | string | null): void {
		const num = Number(value) || 0;
		this.numericValue.set(num);
		this.formattedValue.set(this.format(num));
		this.cdr.markForCheck();
	}

	registerOnChange(fn: (value: number) => void): void {
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
