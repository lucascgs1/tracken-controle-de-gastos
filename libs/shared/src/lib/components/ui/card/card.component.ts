import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'lib-tracken-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './card.component.html',
	styleUrl: './card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackenCard {
	readonly title = input<string>();
	readonly subtitle = input<string>();
	readonly padding = input<'none' | 'sm' | 'md' | 'lg'>('md');
	readonly glass = input(false);
}
