import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { httpErrorInterceptor } from './http-error.interceptor';
import { ToastService } from '../services/toast.service';
import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';

describe('httpErrorInterceptor', () => {
	let httpMock: HttpTestingController;
	let httpClient: HttpClient;
	let toastServiceMock: { show: Mock };

	beforeEach(() => {
		toastServiceMock = {
			show: vi.fn(),
		};

		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptors([httpErrorInterceptor])),
				provideHttpClientTesting(),
				{ provide: ToastService, useValue: toastServiceMock },
			],
		});

		httpMock = TestBed.inject(HttpTestingController);
		httpClient = TestBed.inject(HttpClient);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should show toast message for 401 error', () => {
		httpClient.get('/test').subscribe({
			error: () => {
				// Prevent unhandled error in test
			},
		});

		const req = httpMock.expectOne('/test');
		req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

		expect(toastServiceMock.show).toHaveBeenCalledWith(
			'Sessão expirada. Faça login novamente.',
			'error',
		);
	});

	it('should show toast message for 403 error', () => {
		httpClient.get('/test').subscribe({
			error: () => {
				/* noop */
			},
		});

		const req = httpMock.expectOne('/test');
		req.flush('Forbidden', { status: 403, statusText: 'Forbidden' });

		expect(toastServiceMock.show).toHaveBeenCalledWith(
			'Você não tem permissão para realizar esta ação.',
			'error',
		);
	});

	it('should show toast message for 500 error', () => {
		httpClient.get('/test').subscribe({
			error: () => {
				/* noop */
			},
		});

		const req = httpMock.expectOne('/test');
		req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });

		expect(toastServiceMock.show).toHaveBeenCalledWith('Erro interno no servidor.', 'error');
	});

	it('should use error message from body if available', () => {
		httpClient.get('/test').subscribe({
			error: () => {
				/* noop */
			},
		});

		const req = httpMock.expectOne('/test');
		req.flush({ message: 'Custom API Error' }, { status: 400, statusText: 'Bad Request' });

		expect(toastServiceMock.show).toHaveBeenCalledWith('Custom API Error', 'error');
	});

	it('should show generic error message if no status matches and no body message', () => {
		httpClient.get('/test').subscribe({
			error: () => {
				/* noop */
			},
		});

		const req = httpMock.expectOne('/test');
		req.flush('Unknown Error', { status: 418, statusText: "I'm a teapot" });

		expect(toastServiceMock.show).toHaveBeenCalledWith(
			'Erro na comunicação com o servidor.',
			'error',
		);
	});
});
