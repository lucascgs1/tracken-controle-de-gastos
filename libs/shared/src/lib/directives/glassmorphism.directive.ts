import { Directive, HostBinding, input } from '@angular/core';

@Directive({
	selector: '[libGlass]',
	standalone: true,
})
export class GlassmorphismDirective {
	intensity = input<'low' | 'medium' | 'high'>('medium');

	@HostBinding('style.backdrop-filter')
	get blur() {
		const blurMap = {
			low: 'blur(4px)',
			medium: 'blur(10px)',
			high: 'blur(20px)',
		};
		return blurMap[this.intensity()];
	}

	@HostBinding('style.background')
	get background() {
		return 'rgba(255, 255, 255, 0.05)';
	}

	@HostBinding('style.border')
	get border() {
		return '1px solid rgba(255, 255, 255, 0.1)';
	}
}
