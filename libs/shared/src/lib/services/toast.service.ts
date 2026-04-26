import { Injectable, signal, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
	id: number;
	message: string;
	type: ToastType;
	duration?: number;
}

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	private transloco = inject(TranslocoService);
	toasts = signal<Toast[]>([]);
	private counter = 0;

	/**
	 * Mostra um toast. A mensagem pode ser uma chave de tradução ou texto puro.
	 */
	show(message: string, type: ToastType = 'info', duration = 4000) {
		const id = this.counter++;

		// Tenta traduzir se for uma chave, senão usa o texto original
		const translatedMessage = this.transloco.translate(message);

		const toast: Toast = { id, message: translatedMessage, type, duration };

		this.toasts.update((t) => [...t, toast]);

		if (duration > 0) {
			setTimeout(() => this.remove(id), duration);
		}
	}

	success(message: string, duration?: number) {
		this.show(message, 'success', duration);
	}

	error(message: string, duration?: number) {
		this.show(message, 'error', duration);
	}

	remove(id: number) {
		this.toasts.update((t) => t.filter((x) => x.id !== id));
	}
}
