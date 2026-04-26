import { TestBed } from '@angular/core/testing';
import { TrackenDropdown } from './dropdown.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TrackenDropdown', () => {
	let component: TrackenDropdown;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TrackenDropdown],
		}).compileComponents();

		const fixture = TestBed.createComponent(TrackenDropdown);
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

	it('should close when requested', () => {
		component.isOpen.set(true);
		component.close();
		expect(component.isOpen()).toBe(false);
	});

	it('should close on document click outside', () => {
		component.isOpen.set(true);
		const event = new MouseEvent('click');
		// Manually call it to ensure coverage and logic check
		component.onDocumentClick(event);
		expect(component.isOpen()).toBe(false);
	});
});
