import { TestBed } from '@angular/core/testing';
import { TrackenBadge } from './badge.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TrackenBadge', () => {
	let component: TrackenBadge;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TrackenBadge],
		}).compileComponents();

		const fixture = TestBed.createComponent(TrackenBadge);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should apply correct class based on variant', () => {
		const fixture = TestBed.createComponent(TrackenBadge);
		fixture.componentRef.setInput('variant', 'success');
		fixture.detectChanges();

		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('.tracken-badge')?.classList.contains('success')).toBe(true);
	});
});
