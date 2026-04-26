import { Component, input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'lib-tracken-skeleton',
	standalone: true,
	imports: [CommonModule],
	template: ``,
	styleUrl: './skeleton.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackenSkeleton {
	width = input<string>('100%');
	height = input<string>('1rem');
	variant = input<'text' | 'circle' | 'rounded'>('text');

	@HostBinding('class')
	get hostClasses() {
		return `tracken-skeleton ${this.variant()}`;
	}

	@HostBinding('style.width')
	get hostWidth() {
		return this.width();
	}

	@HostBinding('style.height')
	get hostHeight() {
		return this.height();
	}
}
