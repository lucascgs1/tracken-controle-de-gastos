import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackenButton } from '../button/button.component';

@Component({
	selector: 'lib-tracken-empty-state',
	standalone: true,
	imports: [CommonModule, TrackenButton],
	templateUrl: './empty-state.component.html',
	styleUrl: './empty-state.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackenEmptyState {
	@Input() title = '';
	@Input() description = '';
	@Input() icon = 'search_off';
	@Input() illustrationUrl?: string;
	@Input() actionLabel?: string;

	@Output() actionClick = new EventEmitter<void>();

	onAction() {
		this.actionClick.emit();
	}
}
