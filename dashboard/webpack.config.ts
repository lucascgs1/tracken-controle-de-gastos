import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';

export default withModuleFederation(config, { dts: false }).then((wfConfig) => {
	return (webpackConfig) => {
		const merged = wfConfig(webpackConfig);
		merged.output = {
			...merged.output,
			scriptType: 'module',
		};
		return merged;
	};
});
