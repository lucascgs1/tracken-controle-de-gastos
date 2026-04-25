import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
	name: 'settings',
	exposes: {
		'./Routes': 'settings/src/app/settings.routes.ts',
	},
	shared: (libraryName, sharedConfig) => {
		if (
			[
				'@angular/core',
				'@angular/common',
				'@angular/router',
				'@ngrx/store',
				'@ngrx/effects',
			].includes(libraryName)
		) {
			return {
				...sharedConfig,
				singleton: true,
				strictVersion: false,
				requiredVersion: false,
			};
		}
		return sharedConfig;
	},
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
