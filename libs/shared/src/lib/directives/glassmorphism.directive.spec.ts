import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GlassmorphismDirective } from './glassmorphism.directive';
import { describe, it, expect, beforeEach } from 'vitest';

@Component({
	standalone: true,
	template: `<div
		libGlass
		[intensity]="'high'"
	></div>`,
	imports: [GlassmorphismDirective],
})
class TestComponent {}

describe('GlassmorphismDirective', () => {
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

	it('should apply styles based on intensity', () => {
		const fixture = TestBed.createComponent(TestComponent);
		fixture.detectChanges();
		const el = fixture.nativeElement.querySelector('div');
		expect(el.style.background).toBe('rgba(255, 255, 255, 0.05)');
		expect(el.style.border).toBe('1px solid rgba(255, 255, 255, 0.1)');
	});
});
