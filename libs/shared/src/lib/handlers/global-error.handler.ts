import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	constructor(
		private injector: Injector,
		private zone: NgZone,
	) {}

	handleError(error: any): void {
		// Loga no console para debug
		console.error('Tracken [GlobalError]:', error);

		// Obtém o ToastService de forma lazy para evitar dependência circular
		const toast = this.injector.get(ToastService);

		// Garante que o toast rode dentro da zona do Angular para atualizar a UI
		this.zone.run(() => {
			const message = error?.message || 'Ocorreu um erro inesperado. Tente novamente.';
			toast.show(message, 'danger');
		});
	}
}
