import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TrackenAnimateDirective } from './animate.directive';
import { describe, it, expect, beforeEach } from 'vitest';

@Component({
	standalone: true,
	template: `<div
		[libTrackenAnimate]="'slide-up'"
		[delay]="100"
		[duration]="1000"
	></div>`,
	imports: [TrackenAnimateDirective],
})
class TestComponent {}

describe('TrackenAnimateDirective', () => {
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

	it('should apply initial styles on init', () => {
		const fixture = TestBed.createComponent(TestComponent);
		fixture.detectChanges();
		const el = fixture.nativeElement.querySelector('div');
		expect(el.style.opacity).toBe('0');
		expect(el.style.visibility).toBe('hidden');
	});

	it('should apply animation styles after timeout', async () => {
		const fixture = TestBed.createComponent(TestComponent);
		fixture.detectChanges();

		await new Promise((resolve) => setTimeout(resolve, 100));
		fixture.detectChanges();

		const el = fixture.nativeElement.querySelector('div');
		expect(el.style.visibility).toBe('visible');
		expect(el.style.animationDuration).toBe('1000ms');
		expect(el.style.animationDelay).toBe('100ms');
		expect(el.classList.contains('animate-slide-up')).toBe(true);
	});
});
