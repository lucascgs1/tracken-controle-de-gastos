import { TestBed } from '@angular/core/testing';
import { GlobalErrorHandler } from './global-error.handler';
import { ToastService } from '../services/toast.service';
import { NgZone } from '@angular/core';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';

describe('GlobalErrorHandler', () => {
	let handler: GlobalErrorHandler;
	let toastServiceMock: { show: Mock };
	let zoneMock: { run: Mock };

	beforeEach(() => {
		toastServiceMock = {
			show: vi.fn(),
		};

		zoneMock = {
			run: vi.fn().mockImplementation((fn) => fn()),
		};

		TestBed.configureTestingModule({
			providers: [
				GlobalErrorHandler,
				{ provide: ToastService, useValue: toastServiceMock },
				{ provide: NgZone, useValue: zoneMock },
			],
		});

		handler = TestBed.inject(GlobalErrorHandler);
	});

	it('should be created', () => {
		expect(handler).toBeTruthy();
	});

	it('should log error to console', () => {
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
			/* noop */
		});
		const error = new Error('Test Error');
		handler.handleError(error);
		expect(consoleSpy).toHaveBeenCalledWith('Tracken [GlobalError]:', error);
		consoleSpy.mockRestore();
	});

	it('should show error toast for Error objects', () => {
		const error = new Error('Custom Error Message');
		handler.handleError(error);
		expect(toastServiceMock.show).toHaveBeenCalledWith('Custom Error Message', 'error');
	});

	it('should show default error toast for unknown error types', () => {
		handler.handleError('Something went wrong');
		expect(toastServiceMock.show).toHaveBeenCalledWith('common.unexpectedError', 'error');
	});

	it('should run toast within NgZone', () => {
		const error = new Error('Test');
		handler.handleError(error);
		expect(zoneMock.run).toHaveBeenCalled();
	});
});
