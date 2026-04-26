import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'lib-tracken-page-header',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './page-header.component.html',
	styleUrl: './page-header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackenPageHeader {
	readonly title = input.required<string>();
	readonly subtitle = input<string>();
}
