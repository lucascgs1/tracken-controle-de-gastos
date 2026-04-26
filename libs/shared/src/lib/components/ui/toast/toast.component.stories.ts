import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TrackenToastContainer } from './toast.component';
import { ToastService } from '../../../services/toast.service';
import { TrackenButton } from '../button/button.component';

const meta: Meta<TrackenToastContainer> = {
	component: TrackenToastContainer,
	title: 'UI/Toast',
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CommonModule, TrackenButton],
			providers: [ToastService],
		}),
	],
	render: (args) => ({
		props: args,
		template: `
      <div>
        <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
          <lib-tracken-button (btnClick)="toastService.show('Sucesso!', 'success')">Show Success</lib-tracken-button>
          <lib-tracken-button variant="danger" (btnClick)="toastService.show('Erro detectado', 'error')">Show Error</lib-tracken-button>
          <lib-tracken-button variant="outline" (btnClick)="toastService.show('Aviso importante', 'warning')">Show Warning</lib-tracken-button>
        </div>
        
        <!-- O container fica fixo na tela via CSS, então ele aparece no topo/direita -->
        <lib-tracken-toast-container></lib-tracken-toast-container>
        
        <p style="color: var(--text-dim)">Clique nos botões acima para disparar os toasts.</p>
      </div>
    `,
	}),
};
export default meta;

type Story = StoryObj<TrackenToastContainer>;

export const Default: Story = {
	args: {},
};
