import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export type Language = 'en' | 'pt';

@Injectable({
	providedIn: 'root',
})
export class LanguageService {
	private translocoService = inject(TranslocoService);

	lang = this.translocoService.langChanges$;

	setLanguage(lang: Language) {
		this.translocoService.setActiveLang(lang);
		localStorage.setItem('tracken-lang', lang);
	}

	getActiveLang(): Language {
		return this.translocoService.getActiveLang() as Language;
	}

	constructor() {
		const saved = localStorage.getItem('tracken-lang') as Language;
		if (saved) {
			this.translocoService.setActiveLang(saved);
		}
	}
}
