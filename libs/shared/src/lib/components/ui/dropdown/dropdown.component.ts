import {
	Component,
	signal,
	ElementRef,
	HostListener,
	inject,
	ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'lib-tracken-dropdown',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './dropdown.component.html',
	styleUrl: './dropdown.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackenDropdown {
	private elementRef = inject(ElementRef);
	isOpen = signal(false);

	@HostListener('document:click', ['$event'])
	onDocumentClick(event: MouseEvent) {
		if (!this.elementRef.nativeElement.contains(event.target)) {
			this.isOpen.set(false);
		}
	}

	toggle() {
		this.isOpen.update((v) => !v);
	}

	close() {
		this.isOpen.set(false);
	}
}
