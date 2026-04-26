import { TestBed } from '@angular/core/testing';
import { TrackenPageHeader } from './page-header.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TrackenPageHeader', () => {
	let component: TrackenPageHeader;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TrackenPageHeader],
		}).compileComponents();

		const fixture = TestBed.createComponent(TrackenPageHeader);
		fixture.componentRef.setInput('title', 'Test Title');
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render title', () => {
		const fixture = TestBed.createComponent(TrackenPageHeader);
		fixture.componentRef.setInput('title', 'My Title');
		fixture.detectChanges();

		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('h1')?.textContent).toContain('My Title');
	});
});
