import { Directive, ElementRef, Output, EventEmitter, HostListener, inject } from '@angular/core';

@Directive({
	selector: '[libClickOutside]',
	standalone: true,
})
export class ClickOutsideDirective {
	private elementRef = inject(ElementRef);

	@Output() libClickOutside = new EventEmitter<void>();

	@HostListener('document:click', ['$event.target'])
	public onClick(target: any) {
		const clickedInside = this.elementRef.nativeElement.contains(target as HTMLElement);
		if (!clickedInside) {
			this.libClickOutside.emit();
		}
	}
}
