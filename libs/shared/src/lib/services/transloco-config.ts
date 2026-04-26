import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';

export function provideTrackenTransloco() {
	return provideTransloco({
		config: {
			availableLangs: ['en', 'pt'],
			defaultLang: 'en',
			// Remove this option if your application doesn't support changing language in runtime.
			reRenderOnLangChange: true,
			prodMode: !isDevMode(),
		},
		loader: TranslocoHttpLoader,
	});
}
