import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ClickOutsideDirective } from './click-outside.directive';
import { describe, it, expect, beforeEach, vi } from 'vitest';

@Component({
	standalone: true,
	template: `<div
			id="inside"
			libClickOutside
			(libClickOutside)="onOutsideClick()"
		></div>
		<div id="outside"></div>`,
	imports: [ClickOutsideDirective],
})
class TestComponent {
	onOutsideClick = vi.fn();
}

describe('ClickOutsideDirective', () => {
	let component: TestComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestComponent],
		}).compileComponents();

		const fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit when clicking outside', () => {
		const outsideElement = document.getElementById('outside');
		outsideElement?.click();
		expect(component.onOutsideClick).toHaveBeenCalled();
	});

	it('should NOT emit when clicking inside', () => {
		const insideElement = document.getElementById('inside');
		insideElement?.click();
		expect(component.onOutsideClick).not.toHaveBeenCalled();
	});
});
