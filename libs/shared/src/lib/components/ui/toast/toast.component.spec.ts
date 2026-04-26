import { TestBed } from '@angular/core/testing';
import { TrackenToastContainer } from './toast.component';
import { ToastService, Toast } from '../../../services/toast.service';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { WritableSignal, signal } from '@angular/core';

describe('TrackenToastContainer', () => {
	let component: TrackenToastContainer;
	let toastServiceMock: { toasts: WritableSignal<Toast[]>; remove: Mock };

	beforeEach(async () => {
		toastServiceMock = {
			toasts: signal([]),
			remove: vi.fn(),
		};

		await TestBed.configureTestingModule({
			imports: [TrackenToastContainer],
			providers: [{ provide: ToastService, useValue: toastServiceMock }],
		}).compileComponents();

		const fixture = TestBed.createComponent(TrackenToastContainer);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should return correct icon for each type', () => {
		expect(component.getIcon('success')).toBe('check_circle');
		expect(component.getIcon('error')).toBe('error');
		expect(component.getIcon('warning')).toBe('warning');
		expect(component.getIcon('info')).toBe('info');
		expect(component.getIcon('unknown')).toBe('info');
	});

	it('should render toasts when they exist', () => {
		toastServiceMock.toasts.set([{ id: 1, message: 'Test', type: 'success' }]);
		const fixture = TestBed.createComponent(TrackenToastContainer);
		fixture.detectChanges();
		const toastElements = fixture.nativeElement.querySelectorAll('.toast');
		expect(toastElements.length).toBe(1);
		expect(toastElements[0].textContent).toContain('Test');
	});

	it('should call remove when a toast is clicked', () => {
		toastServiceMock.toasts.set([{ id: 1, message: 'Test', type: 'success' }]);
		const fixture = TestBed.createComponent(TrackenToastContainer);
		fixture.detectChanges();
		const toastElement = fixture.nativeElement.querySelector('.toast');
		toastElement.click();
		expect(toastServiceMock.remove).toHaveBeenCalledWith(1);
	});
});
