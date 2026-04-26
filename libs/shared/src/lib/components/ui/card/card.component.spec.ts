import { TestBed } from '@angular/core/testing';
import { TrackenCard } from './card.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TrackenCard', () => {
	let component: TrackenCard;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TrackenCard],
		}).compileComponents();

		const fixture = TestBed.createComponent(TrackenCard);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render title and subtitle when provided', () => {
		const fixture = TestBed.createComponent(TrackenCard);
		fixture.componentRef.setInput('title', 'Card Title');
		fixture.componentRef.setInput('subtitle', 'Card Subtitle');
		fixture.detectChanges();

		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('h3')?.textContent).toContain('Card Title');
		expect(compiled.querySelector('.subtitle')?.textContent).toContain('Card Subtitle');
	});

	it('should apply glass class when glass input is true', () => {
		const fixture = TestBed.createComponent(TrackenCard);
		fixture.componentRef.setInput('glass', true);
		fixture.detectChanges();

		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('.premium-card')?.classList.contains('glass')).toBe(true);
	});

	it('should apply padding class based on padding input', () => {
		const fixture = TestBed.createComponent(TrackenCard);
		fixture.componentRef.setInput('padding', 'lg');
		fixture.detectChanges();

		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('.premium-card')?.classList.contains('padding-lg')).toBe(true);
	});
});
