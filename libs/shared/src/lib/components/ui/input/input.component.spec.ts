import { TestBed } from '@angular/core/testing';
import { TrackenInput } from './input.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FormsModule } from '@angular/forms';

describe('TrackenInput', () => {
	let component: TrackenInput;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FormsModule, TrackenInput],
		}).compileComponents();

		const fixture = TestBed.createComponent(TrackenInput);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should update value and call onChange when input occurs', () => {
		const onChangeSpy = vi.fn();
		component.registerOnChange(onChangeSpy);

		const event = { target: { value: 'New Value' } } as unknown as Event;
		component.onInput(event);

		expect(component.value()).toBe('New Value');
		expect(onChangeSpy).toHaveBeenCalledWith('New Value');
	});

	it('should call onTouched when blurred', () => {
		const onTouchedSpy = vi.fn();
		component.registerOnTouched(onTouchedSpy);

		component.onBlur();

		expect(onTouchedSpy).toHaveBeenCalled();
	});

	it('should update value signal when writeValue is called', () => {
		component.writeValue('Test Value');
		expect(component.value()).toBe('Test Value');
	});

	it('should update disabled signal when setDisabledState is called', () => {
		component.setDisabledState(true);
		expect(component.disabled()).toBe(true);
	});
});
