import { TestBed } from '@angular/core/testing';
import { TrackenMoneyInput } from './money-input.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FormsModule } from '@angular/forms';

describe('TrackenMoneyInput', () => {
	let component: TrackenMoneyInput;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FormsModule, TrackenMoneyInput],
		}).compileComponents();

		const fixture = TestBed.createComponent(TrackenMoneyInput);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should format numeric input correctly', () => {
		const onChangeSpy = vi.fn();
		component.registerOnChange(onChangeSpy);

		const event = { target: { value: '12345' } } as unknown as Event;
		component.onInput(event);

		expect(component.numericValue()).toBe(123.45);
		expect(component.formattedValue()).toBe('123.45');
		expect(onChangeSpy).toHaveBeenCalledWith(123.45);
	});

	it('should handle empty input', () => {
		const onChangeSpy = vi.fn();
		component.registerOnChange(onChangeSpy);

		const event = { target: { value: '' } } as unknown as Event;
		component.onInput(event);

		expect(component.numericValue()).toBe(0);
		expect(component.formattedValue()).toBe('');
		expect(onChangeSpy).toHaveBeenCalledWith(0);
	});

	it('should update values when writeValue is called', () => {
		component.writeValue(99.99);
		expect(component.numericValue()).toBe(99.99);
		expect(component.formattedValue()).toBe('99.99');
	});

	it('should call onTouched on blur', () => {
		const onTouchedSpy = vi.fn();
		component.registerOnTouched(onTouchedSpy);
		component.onBlur();
		expect(onTouchedSpy).toHaveBeenCalled();
	});

	it('should update disabled state', () => {
		component.setDisabledState(true);
		expect(component.disabled()).toBe(true);
	});
});
