import { TestBed } from '@angular/core/testing';
import { TrackenModal } from './modal.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('TrackenModal', () => {
	let component: TrackenModal;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TrackenModal],
		}).compileComponents();

		const fixture = TestBed.createComponent(TrackenModal);
		fixture.componentRef.setInput('title', 'Test Modal');
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit closed when escape is pressed', () => {
		const emitSpy = vi.spyOn(component.closed, 'emit');
		component.onEscape();
		expect(emitSpy).toHaveBeenCalled();
	});

	it('should emit closed when overlay is clicked', () => {
		const emitSpy = vi.spyOn(component.closed, 'emit');
		const event = { target: 'overlay', currentTarget: 'overlay' } as unknown as Event;
		component.closeOnOverlay(event);
		expect(emitSpy).toHaveBeenCalled();
	});

	it('should NOT emit closed when content is clicked', () => {
		const emitSpy = vi.spyOn(component.closed, 'emit');
		const event = { target: 'content', currentTarget: 'overlay' } as unknown as Event;
		component.closeOnOverlay(event);
		expect(emitSpy).not.toHaveBeenCalled();
	});
});
