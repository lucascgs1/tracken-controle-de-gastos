import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TrackenModal } from './modal.component';
import { TrackenButton } from '../button/button.component';

const meta: Meta<TrackenModal> = {
	component: TrackenModal,
	title: 'UI/Modal',
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CommonModule, TrackenButton],
		}),
	],
	render: (args) => ({
		props: {
			...args,
			isOpen: true,
			toggle: () => {
				/* used for internal toggle logic */
			},
		},
		template: `
      <div style="height: 400px; position: relative;">
        <lib-tracken-button (btnClick)="isOpen = true">Abrir Modal</lib-tracken-button>
        
        <lib-tracken-modal 
          *ngIf="isOpen" 
          [title]="title" 
          [maxWidth]="maxWidth" 
          [hasFooter]="hasFooter"
          (closed)="isOpen = false">
          
          <div body>
            <p style="color: var(--text-muted)">
              Este é o conteúdo principal do modal. Você pode colocar formulários, 
              mensagens de confirmação ou qualquer outro conteúdo aqui.
            </p>
          </div>
          
          <div footer style="display: flex; gap: 1rem; justify-content: flex-end; width: 100%">
            <lib-tracken-button variant="outline" (btnClick)="isOpen = false">Cancelar</lib-tracken-button>
            <lib-tracken-button (btnClick)="isOpen = false">Confirmar</lib-tracken-button>
          </div>
          
        </lib-tracken-modal>
      </div>
    `,
	}),
};
export default meta;

type Story = StoryObj<TrackenModal>;

export const Default: Story = {
	args: {
		title: 'Título do Modal',
		maxWidth: '500px',
		hasFooter: true,
	},
};

export const Small: Story = {
	args: {
		title: 'Confirmação',
		maxWidth: '350px',
		hasFooter: true,
	},
};
