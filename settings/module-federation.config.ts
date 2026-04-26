import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
	name: 'settings',
	exposes: {
		'./settings.routes': 'src/app/settings.routes.ts',
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

export default config;
