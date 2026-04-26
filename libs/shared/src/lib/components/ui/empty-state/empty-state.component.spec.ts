import { TestBed } from '@angular/core/testing';
import { TrackenEmptyState } from './empty-state.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('TrackenEmptyState', () => {
	let component: TrackenEmptyState;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TrackenEmptyState],
		}).compileComponents();

		const fixture = TestBed.createComponent(TrackenEmptyState);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit actionClick when action is clicked', () => {
		const emitSpy = vi.spyOn(component.actionClick, 'emit');
		component.onAction();
		expect(emitSpy).toHaveBeenCalled();
	});

	it('should render title and description', () => {
		const fixture = TestBed.createComponent(TrackenEmptyState);
		fixture.componentInstance.title = 'Empty Title';
		fixture.componentInstance.description = 'Empty Desc';
		fixture.detectChanges();

		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('h3')?.textContent).toContain('Empty Title');
		expect(compiled.querySelector('p')?.textContent).toContain('Empty Desc');
	});
});
