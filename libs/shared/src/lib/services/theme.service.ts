import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	private readonly THEME_KEY = 'tracken-theme';
	theme = signal<Theme>((localStorage.getItem(this.THEME_KEY) as Theme) || 'light');

	constructor() {
		// Efeito que sincroniza o sinal com o DOM e o LocalStorage
		effect(() => {
			const currentTheme = this.theme();
			document.documentElement.setAttribute('data-theme', currentTheme);
			localStorage.setItem(this.THEME_KEY, currentTheme);
		});
	}

	toggleTheme() {
		this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
	}

	setTheme(theme: Theme) {
		this.theme.set(theme);
	}
}
