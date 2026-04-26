import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

export type AnimationType = 'fade-in' | 'slide-up' | 'slide-in-right' | 'zoom-in';

@Directive({
	selector: '[libTrackenAnimate]',
	standalone: true,
})
export class TrackenAnimateDirective implements OnInit {
	@Input('libTrackenAnimate') type: AnimationType = 'fade-in';
	@Input() delay = 0;
	@Input() duration = 500;

	constructor(
		private el: ElementRef,
		private renderer: Renderer2,
	) {}

	ngOnInit() {
		// Estado inicial (escondido)
		this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
		this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');

		// Pequeno delay para garantir que o DOM está pronto
		setTimeout(() => {
			this.applyAnimation();
		}, 50);
	}

	private applyAnimation() {
		const element = this.el.nativeElement;

		this.renderer.setStyle(element, 'visibility', 'visible');
		this.renderer.setStyle(element, 'animation-duration', `${this.duration}ms`);
		this.renderer.setStyle(element, 'animation-delay', `${this.delay}ms`);
		this.renderer.setStyle(element, 'animation-fill-mode', 'forwards');
		this.renderer.setStyle(element, 'animation-timing-function', 'cubic-bezier(0.4, 0, 0.2, 1)');

		this.renderer.addClass(element, `animate-${this.type}`);
	}
}
