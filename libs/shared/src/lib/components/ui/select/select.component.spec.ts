import { TestBed } from '@angular/core/testing';
import { TrackenSelect, SelectOption } from './select.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('TrackenSelect', () => {
	let component: TrackenSelect;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TrackenSelect],
		}).compileComponents();

		const fixture = TestBed.createComponent(TrackenSelect);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should toggle open state', () => {
		component.toggle();
		expect(component.isOpen()).toBe(true);
		component.toggle();
		expect(component.isOpen()).toBe(false);
	});

	it('should not toggle when disabled', () => {
		component.setDisabledState(true);
		component.toggle();
		expect(component.isOpen()).toBe(false);
	});

	it('should select option and close', () => {
		const onChangeSpy = vi.fn();
		component.registerOnChange(onChangeSpy);
		const option: SelectOption = { label: 'Option 1', value: 1 };

		component.isOpen.set(true);
		component.selectOption(option);

		expect(component.value()).toBe(1);
		expect(component.isOpen()).toBe(false);
		expect(onChangeSpy).toHaveBeenCalledWith(1);
	});

	it('should compute selected label correctly', () => {
		const fixture = TestBed.createComponent(TrackenSelect);
		fixture.componentRef.setInput('options', [{ label: 'Opt 1', value: 'v1' }]);
		fixture.detectChanges();

		fixture.componentInstance.writeValue('v1');
		fixture.detectChanges();

		expect(fixture.componentInstance.selectedLabel()).toBe('Opt 1');
	});

	it('should close on external click', () => {
		component.isOpen.set(true);
		component.close();
		expect(component.isOpen()).toBe(false);
	});
});
