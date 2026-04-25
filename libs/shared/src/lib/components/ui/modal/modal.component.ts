import { Component, input, output, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-tracken-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackenModal {
  title = input.required<string>();
  maxWidth = input<string>('500px');
  hasFooter = input(true);
  closed = output<void>();

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closed.emit();
  }

  closeOnOverlay(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closed.emit();
    }
  }
}
