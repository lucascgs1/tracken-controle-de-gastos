import { TestBed } from '@angular/core/testing';
import { TrackenSkeleton } from './skeleton.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TrackenSkeleton', () => {
	let component: TrackenSkeleton;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TrackenSkeleton],
		}).compileComponents();

		const fixture = TestBed.createComponent(TrackenSkeleton);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should apply correct classes based on variant', () => {
		const fixture = TestBed.createComponent(TrackenSkeleton);
		fixture.componentRef.setInput('variant', 'circle');
		fixture.detectChanges();

		expect(fixture.componentInstance.hostClasses).toContain('circle');
	});

	it('should apply correct styles based on width and height', () => {
		const fixture = TestBed.createComponent(TrackenSkeleton);
		fixture.componentRef.setInput('width', '200px');
		fixture.componentRef.setInput('height', '50px');
		fixture.detectChanges();

		expect(fixture.componentInstance.hostWidth).toBe('200px');
		expect(fixture.componentInstance.hostHeight).toBe('50px');
	});
});
