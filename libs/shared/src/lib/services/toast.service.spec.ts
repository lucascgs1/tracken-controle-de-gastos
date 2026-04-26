import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { TranslocoService } from '@jsverse/transloco';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';

describe('ToastService', () => {
	let service: ToastService;
	let translocoServiceMock: { translate: Mock };

	beforeEach(() => {
		translocoServiceMock = {
			translate: vi.fn().mockImplementation((key) => key),
		};

		TestBed.configureTestingModule({
			providers: [ToastService, { provide: TranslocoService, useValue: translocoServiceMock }],
		});

		service = TestBed.inject(ToastService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should add a toast when show is called', () => {
		service.show('Test Message', 'success', 0);
		const toasts = service.toasts();
		expect(toasts.length).toBe(1);
		expect(toasts[0].message).toBe('Test Message');
		expect(toasts[0].type).toBe('success');
	});

	it('should use transloco to translate messages', () => {
		translocoServiceMock.translate.mockReturnValue('Translated Message');
		service.show('key', 'info', 0);
		expect(translocoServiceMock.translate).toHaveBeenCalledWith('key');
		expect(service.toasts()[0].message).toBe('Translated Message');
	});

	it('should remove a toast after duration', () => {
		vi.useFakeTimers();
		service.show('Timed Toast', 'info', 1000);
		expect(service.toasts().length).toBe(1);
		vi.advanceTimersByTime(1100);
		expect(service.toasts().length).toBe(0);
		vi.useRealTimers();
	});

	it('should NOT remove a toast automatically if duration is 0', () => {
		vi.useFakeTimers();
		service.show('Permanent Toast', 'info', 0);
		expect(service.toasts().length).toBe(1);
		vi.advanceTimersByTime(10000);
		expect(service.toasts().length).toBe(1);
		vi.useRealTimers();
	});

	it('should remove toast manually', () => {
		service.show('Manual Toast', 'info', 0);
		const id = service.toasts()[0].id;
		service.remove(id);
		expect(service.toasts().length).toBe(0);
	});

	it('should have success helper method', () => {
		service.success('Success', 0);
		expect(service.toasts()[0].type).toBe('success');
	});

	it('should have error helper method', () => {
		service.error('Error', 0);
		expect(service.toasts()[0].type).toBe('error');
	});
});
