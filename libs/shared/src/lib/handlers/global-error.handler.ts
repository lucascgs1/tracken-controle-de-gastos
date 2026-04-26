import { ErrorHandler, Injectable, Injector, NgZone, inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	private injector = inject(Injector);
	private zone = inject(NgZone);

	handleError(error: unknown): void {
		// Loga no console para debug
		console.error('Tracken [GlobalError]:', error);

		// Obtém o ToastService de forma lazy para evitar dependência circular
		const toast = this.injector.get(ToastService);

		// Garante que o toast rode dentro da zona do Angular para atualizar a UI
		this.zone.run(() => {
			const message = error instanceof Error ? error.message : 'common.unexpectedError';
			toast.show(message, 'error');
		});
	}
}
