import { Component, Output, EventEmitter, input } from '@angular/core';

@Component({
	selector: 'lib-tracken-button',
	standalone: true,
	imports: [],
	templateUrl: './button.component.html',
	styleUrl: './button.component.scss',
})
export class TrackenButton {
	readonly variant = input<'primary' | 'secondary' | 'outline' | 'ghost'>('primary');
	readonly size = input<'sm' | 'md' | 'lg'>('md');
	readonly disabled = input(false);
	readonly loading = input(false);
	readonly type = input<'button' | 'submit' | 'reset'>('button');
	readonly icon = input<string>();
	readonly iconPosition = input<'left' | 'right'>('left');

	@Output() btnClick = new EventEmitter<void>();

	onClick() {
		if (!this.disabled() && !this.loading()) {
			this.btnClick.emit();
		}
	}

	get classes(): string {
		return `btn btn-${this.variant()} btn-${this.size()} ${this.loading() ? 'btn-loading' : ''}`;
	}
}
