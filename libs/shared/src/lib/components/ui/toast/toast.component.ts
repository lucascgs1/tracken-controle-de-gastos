import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
	selector: 'lib-tracken-toast-container',
	standalone: true,
	imports: [CommonModule],
	template: `
		<div class="toast-container">
			@for (toast of toastService.toasts(); track toast.id) {
				<div
					class="toast"
					[class]="toast.type"
					(click)="toastService.remove(toast.id)"
				>
					<span class="material-icons">
						{{ getIcon(toast.type) }}
					</span>
					<span class="message">{{ toast.message }}</span>
					<button class="close-btn">&times;</button>
				</div>
			}
		</div>
	`,
	styleUrl: './toast.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackenToastContainer {
	public toastService = inject(ToastService);

	getIcon(type: string) {
		switch (type) {
			case 'success':
				return 'check_circle';
			case 'error':
				return 'error';
			case 'warning':
				return 'warning';
			default:
				return 'info';
		}
	}
}
