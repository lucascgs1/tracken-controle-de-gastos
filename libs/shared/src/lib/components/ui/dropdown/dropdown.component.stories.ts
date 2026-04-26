import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TrackenDropdown } from './dropdown.component';
import { TrackenButton } from '../button/button.component';

const meta: Meta<TrackenDropdown> = {
	component: TrackenDropdown,
	title: 'UI/Dropdown',
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CommonModule, TrackenButton],
		}),
	],
	render: (args) => ({
		props: args,
		template: `
      <div style="height: 200px; display: flex; justify-content: center; padding-top: 2rem;">
        <lib-tracken-dropdown>
          <div trigger>
            <lib-tracken-button variant="outline" icon="more_vert">Ações</lib-tracken-button>
          </div>
          
          <div content style="display: flex; flex-direction: column; min-width: 150px;">
            <button style="padding: 0.75rem 1rem; text-align: left; background: none; border: none; color: var(--text-main); cursor: pointer; display: flex; align-items: center; gap: 0.5rem;" onmouseover="this.style.background='var(--bg-main)'" onmouseout="this.style.background='none'">
              <span class="material-icons" style="font-size: 1.2rem">edit</span> Editar
            </button>
            <button style="padding: 0.75rem 1rem; text-align: left; background: none; border: none; color: var(--danger); cursor: pointer; display: flex; align-items: center; gap: 0.5rem;" onmouseover="this.style.background='var(--bg-main)'" onmouseout="this.style.background='none'">
              <span class="material-icons" style="font-size: 1.2rem">delete</span> Excluir
            </button>
          </div>
        </lib-tracken-dropdown>
      </div>
    `,
	}),
};
export default meta;

type Story = StoryObj<TrackenDropdown>;

export const Default: Story = {
	args: {},
};
