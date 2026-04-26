import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'ghost';

@Component({
	selector: 'lib-tracken-badge',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './badge.component.html',
	styleUrl: './badge.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackenBadge {
	variant = input<BadgeVariant>('info');
}
