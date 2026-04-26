import { Injectable, inject, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export type Language = 'en' | 'pt';

@Injectable({
	providedIn: 'root',
})
export class LanguageService {
	private translocoService = inject(TranslocoService);

	currentLang = signal<Language>('en');
	lang = this.translocoService.langChanges$;

	setLanguage(lang: Language) {
		this.translocoService.setActiveLang(lang);
		this.currentLang.set(lang);
		localStorage.setItem('tracken-lang', lang);
	}

	getActiveLang(): Language {
		return this.translocoService.getActiveLang() as Language;
	}

	constructor() {
		const saved = localStorage.getItem('tracken-lang') as Language;
		const initialLang = saved || (this.translocoService.getActiveLang() as Language) || 'en';
		this.setLanguage(initialLang);
	}
}
