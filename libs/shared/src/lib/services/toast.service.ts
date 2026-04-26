import { Injectable, signal } from '@angular/core';

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
	toasts = signal<Toast[]>([]);
	private counter = 0;

	show(message: string, type: ToastType = 'info', duration = 4000) {
		const id = this.counter++;
		const toast: Toast = { id, message, type, duration };

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
