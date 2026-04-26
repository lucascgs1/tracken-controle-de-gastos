import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'midnight';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	private readonly THEME_KEY = 'tracken-theme';

	// Signal que armazena o tema atual, persistido no LocalStorage
	theme = signal<Theme>((localStorage.getItem(this.THEME_KEY) as Theme) || 'light');

	constructor() {
		// Efeito reativo para aplicar o tema ao documento e salvar a preferência
		effect(() => {
			const currentTheme = this.theme();
			this.applyTheme(currentTheme);
			localStorage.setItem(this.THEME_KEY, currentTheme);
		});
	}

	toggleTheme() {
		this.theme.update((t) => {
			if (t === 'light') return 'dark';
			if (t === 'dark') return 'midnight';
			return 'light';
		});
	}

	setTheme(theme: Theme) {
		this.theme.set(theme);
	}

	private applyTheme(theme: Theme) {
		const root = document.documentElement;
		root.setAttribute('data-theme', theme);

		// Meta tag para cor do navegador (Senior UX Detail)
		const metaThemeColor = document.querySelector('meta[name="theme-color"]');
		const colorMap: Record<Theme, string> = {
			light: '#f8fafc',
			dark: '#020617',
			midnight: '#000000',
		};

		if (metaThemeColor) {
			metaThemeColor.setAttribute('content', colorMap[theme]);
		}
	}
}
