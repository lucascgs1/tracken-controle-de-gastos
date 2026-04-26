import {
	Component,
	signal,
	computed,
	ChangeDetectionStrategy,
	inject,
	effect,
	Renderer2,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
	TrackenButton,
	TrackenDropdown,
	TrackenToastContainer,
	LanguageService,
	Language,
	ThemeService,
	InitialsPipe,
} from '@tracken/shared';
import { AuthFacade } from '@tracken/data-access';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
	standalone: true,
	selector: 'app-root',
	imports: [
		CommonModule,
		RouterModule,
		TrackenButton,
		TrackenDropdown,
		TrackenToastContainer,
		TranslocoDirective,
		InitialsPipe,
	],
	templateUrl: './app.html',
	styleUrl: './app.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	private authFacade = inject(AuthFacade);
	public langService = inject(LanguageService);
	public themeService = inject(ThemeService);
	private renderer = inject(Renderer2);

	constructor() {
		// Atualiza o atributo 'lang' do HTML dinamicamente para A11y/SEO
		effect(() => {
			const currentLang = this.langService.currentLang();
			this.renderer.setAttribute(document.documentElement, 'lang', currentLang);
		});
	}

	// Reatividade fina com Signals
	user = toSignal(this.authFacade.user$);
	isDarkMode = computed(() => this.themeService.theme() === 'dark');

	toggleTheme() {
		this.themeService.toggleTheme();
	}

	setLanguage(lang: Language) {
		this.langService.setLanguage(lang);
	}

	onLogout() {
		this.authFacade.logout();
	}
}
