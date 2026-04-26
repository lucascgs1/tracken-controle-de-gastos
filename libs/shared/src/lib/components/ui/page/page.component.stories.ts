import type { Meta, StoryObj } from '@storybook/angular';
import { TrackenPage } from './page.component';

const meta: Meta<TrackenPage> = {
	component: TrackenPage,
	title: 'UI/Page',
};
export default meta;

type Story = StoryObj<TrackenPage>;

export const Default: Story = {
	args: {},
	render: (args) => ({
		props: args,
		template: `
      <lib-tracken-page>
        <div style="padding: 2rem; background: var(--bg-card); border-radius: 1rem; border: 1px solid var(--glass-border)">
          <h2 style="color: var(--text-main); margin-bottom: 1rem">Conteúdo da Página</h2>
          <p style="color: var(--text-muted)">Este componente fornece a estrutura base (layout) para as páginas do sistema.</p>
        </div>
      </lib-tracken-page>
    `,
	}),
};
