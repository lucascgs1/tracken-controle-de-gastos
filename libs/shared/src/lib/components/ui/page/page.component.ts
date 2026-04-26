import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'lib-tracken-page',
	standalone: true,
	imports: [CommonModule],
	template: `
		<div
			class="tracken-page-container"
			[style.max-width.px]="maxWidth()"
		>
			<ng-content></ng-content>
		</div>
	`,
	styles: [
		`
			.tracken-page-container {
				width: 100%;
				margin: 0 auto;
				padding-bottom: 2rem;

				@media (max-width: 768px) {
					padding-bottom: 1rem;
				}
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackenPage {
	readonly maxWidth = input<number>(1000);
}
