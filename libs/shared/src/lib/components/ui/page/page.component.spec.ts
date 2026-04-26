import { TestBed } from '@angular/core/testing';
import { TrackenPage } from './page.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TrackenPage', () => {
	let component: TrackenPage;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TrackenPage],
		}).compileComponents();

		const fixture = TestBed.createComponent(TrackenPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should apply maxWidth style', () => {
		const fixture = TestBed.createComponent(TrackenPage);
		fixture.componentRef.setInput('maxWidth', 800);
		fixture.detectChanges();

		const el = fixture.nativeElement.querySelector('.tracken-page-container') as HTMLElement;
		expect(el.style.maxWidth).toBe('800px');
	});
});
