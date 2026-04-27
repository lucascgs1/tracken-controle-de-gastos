import {
	Component,
	input,
	signal,
	forwardRef,
	ChangeDetectionStrategy,
	computed,
	inject,
	ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export interface SegmentOption {
	label: string;
	value: string | number | boolean;
}

@Component({
	selector: 'lib-tracken-segmented-control',
	standalone: true,
	imports: [CommonModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TrackenSegmentedControl),
			multi: true,
		},
	],
	templateUrl: './segmented-control.component.html',
	styleUrl: './segmented-control.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackenSegmentedControl implements ControlValueAccessor {
	options = input.required<SegmentOption[]>();

	value = signal<string | number | boolean | null>(null);
	disabled = signal(false);

	selectedIndex = computed(() => {
		const currentVal = this.value();
		return this.options().findIndex((opt) => opt.value === currentVal);
	});

	private onChange: (value: string | number | boolean | null) => void = () => {
		// noop
	};
	private onTouched: () => void = () => {
		// noop
	};
	private cdr = inject(ChangeDetectorRef);

	select(val: string | number | boolean) {
		if (!this.disabled()) {
			this.value.set(val);
			this.onChange(val);
			this.onTouched();
		}
	}

	writeValue(value: string | number | boolean | null): void {
		this.value.set(value);
		this.cdr.markForCheck();
	}

	registerOnChange(fn: (value: string | number | boolean | null) => void): void {
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
