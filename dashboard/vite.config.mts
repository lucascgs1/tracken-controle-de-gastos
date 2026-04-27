/// <reference types='vitest' />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
	root: __dirname,
	cacheDir: '../node_modules/.vite/dashboard',
	plugins: [angular(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
	// Uncomment this if you are using workers.
	// worker: {
	//   plugins: () => [ nxViteTsPaths() ],
	// },
	test: {
		name: 'dashboard',
		watch: false,
		globals: true,
		environment: 'jsdom',
		include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		setupFiles: ['src/test-setup.ts'],
		reporters: ['default'],
		server: {
			deps: {
				inline: [
					'rxfire',
					'firebase',
					'@angular/fire',
					'@angular/fire/auth',
					'@angular/fire/firestore',
					'@angular/fire/app',
				],
			},
		},
		coverage: {
			reportsDirectory: '../coverage/dashboard',
			provider: 'v8' as const,
		},
	},
}));
