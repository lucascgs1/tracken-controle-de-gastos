import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
	const toast = inject(ToastService);

	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			let errorMessage = 'Erro na comunicação com o servidor.';

			if (error.error instanceof ErrorEvent) {
				// Erro do lado do cliente
				errorMessage = `Erro: ${error.error.message}`;
			} else {
				// Erro do lado do servidor (Firebase, etc)
				switch (error.status) {
					case 401:
						errorMessage = 'Sessão expirada. Faça login novamente.';
						break;
					case 403:
						errorMessage = 'Você não tem permissão para realizar esta ação.';
						break;
					case 404:
						errorMessage = 'Recurso não encontrado.';
						break;
					case 500:
						errorMessage = 'Erro interno no servidor.';
						break;
					default:
						errorMessage = error.error?.message || errorMessage;
				}
			}

			toast.show(errorMessage, 'error');
			return throwError(() => error);
		}),
	);
};
