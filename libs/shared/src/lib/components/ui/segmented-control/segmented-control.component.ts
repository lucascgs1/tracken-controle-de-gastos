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
	value: any;
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

	value = signal<any>(null);
	disabled = signal(false);

	selectedIndex = computed(() => {
		const currentVal = this.value();
		return this.options().findIndex((opt) => opt.value === currentVal);
	});

	private onChange: (value: any) => void = () => {
		// noop
	};
	private onTouched: () => void = () => {
		// noop
	};
	private cdr = inject(ChangeDetectorRef);

	select(val: any) {
		if (!this.disabled()) {
			this.value.set(val);
			this.onChange(val);
			this.onTouched();
		}
	}

	writeValue(value: any): void {
		this.value.set(value);
		this.cdr.markForCheck();
	}

	registerOnChange(fn: (value: any) => void): void {
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
