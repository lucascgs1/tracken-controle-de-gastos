import { TestBed } from '@angular/core/testing';
import { TrackenButton } from './button.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('TrackenButton', () => {
	let component: TrackenButton;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TrackenButton],
		}).compileComponents();

		const fixture = TestBed.createComponent(TrackenButton);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit btnClick when clicked', () => {
		const emitSpy = vi.spyOn(component.btnClick, 'emit');
		component.onClick();
		expect(emitSpy).toHaveBeenCalled();
	});

	it('should NOT emit btnClick when disabled', () => {
		const fixture = TestBed.createComponent(TrackenButton);
		const emitSpy = vi.spyOn(fixture.componentInstance.btnClick, 'emit');

		fixture.componentRef.setInput('disabled', true);
		fixture.detectChanges();

		fixture.componentInstance.onClick();
		expect(emitSpy).not.toHaveBeenCalled();
	});

	it('should NOT emit btnClick when loading', () => {
		const fixture = TestBed.createComponent(TrackenButton);
		const emitSpy = vi.spyOn(fixture.componentInstance.btnClick, 'emit');

		fixture.componentRef.setInput('loading', true);
		fixture.detectChanges();

		fixture.componentInstance.onClick();
		expect(emitSpy).not.toHaveBeenCalled();
	});

	it('should return correct classes based on variant and size', () => {
		const fixture = TestBed.createComponent(TrackenButton);
		fixture.componentRef.setInput('variant', 'danger');
		fixture.componentRef.setInput('size', 'lg');
		fixture.detectChanges();

		expect(fixture.componentInstance.classes).toContain('btn-danger');
		expect(fixture.componentInstance.classes).toContain('btn-lg');
	});

	it('should include loading class when loading is true', () => {
		const fixture = TestBed.createComponent(TrackenButton);
		fixture.componentRef.setInput('loading', true);
		fixture.detectChanges();

		expect(fixture.componentInstance.classes).toContain('btn-loading');
	});
});
