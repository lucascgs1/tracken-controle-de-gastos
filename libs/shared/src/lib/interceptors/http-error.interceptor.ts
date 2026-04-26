import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
	const toast = inject(ToastService);

	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			let errorMessage = 'errors.network';

			if (error.error instanceof ErrorEvent) {
				// Client-side error
				errorMessage = `errors.network`;
			} else {
				// Server-side error
				switch (error.status) {
					case 401:
						errorMessage = 'errors.unauthorized';
						break;
					case 403:
						errorMessage = 'errors.forbidden';
						break;
					case 404:
						errorMessage = 'errors.notFound';
						break;
					case 500:
						errorMessage = 'errors.internal';
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
