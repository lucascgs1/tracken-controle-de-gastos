import { TestBed } from '@angular/core/testing';
import { TrackenSegmentedControl, SegmentOption } from './segmented-control.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('TrackenSegmentedControl', () => {
	let component: TrackenSegmentedControl;
	const options: SegmentOption[] = [
		{ label: 'Day', value: 'day' },
		{ label: 'Week', value: 'week' },
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TrackenSegmentedControl],
		}).compileComponents();

		const fixture = TestBed.createComponent(TrackenSegmentedControl);
		fixture.componentRef.setInput('options', options);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should select value and call onChange', () => {
		const onChangeSpy = vi.fn();
		component.registerOnChange(onChangeSpy);

		component.select('week');

		expect(component.value()).toBe('week');
		expect(onChangeSpy).toHaveBeenCalledWith('week');
	});

	it('should NOT select when disabled', () => {
		const onChangeSpy = vi.fn();
		component.registerOnChange(onChangeSpy);
		component.setDisabledState(true);

		component.select('week');

		expect(component.value()).not.toBe('week');
		expect(onChangeSpy).not.toHaveBeenCalled();
	});

	it('should compute selectedIndex correctly', () => {
		component.writeValue('week');
		expect(component.selectedIndex()).toBe(1);
	});
});
