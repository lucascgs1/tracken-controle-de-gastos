import { Component, signal, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
	TrackenButton,
	TrackenDropdown,
	TrackenToastContainer,
	LanguageService,
	Language,
	ThemeService,
} from '@tracken/shared';
import { AuthFacade } from '@tracken/data-access';
import { AsyncPipe } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
	imports: [
		RouterModule,
		TrackenButton,
		TrackenDropdown,
		TrackenToastContainer,
		AsyncPipe,
		TranslocoDirective,
	],
	selector: 'app-root',
	template: `
		<div
			class="shell-container"
			*transloco="let t"
		>
			<header>
				<h1>Tracken</h1>
				<nav>
					<div class="lang-selector">
						<button
							[class.active]="langService.getActiveLang() === 'en'"
							(click)="setLanguage('en')"
						>
							EN
						</button>
						<button
							[class.active]="langService.getActiveLang() === 'pt'"
							(click)="setLanguage('pt')"
						>
							PT
						</button>
					</div>

					<lib-tracken-button
						(btnClick)="toggleTheme()"
						variant="secondary"
						size="sm"
						[icon]="isDarkMode() ? 'light_mode' : 'dark_mode'"
					>
						{{ t('common.theme') }}
					</lib-tracken-button>

					@if (user$ | async; as user) {
						<lib-tracken-button
							variant="ghost"
							size="sm"
							routerLink="/dashboard"
						>
							{{ t('common.dashboard') }}
						</lib-tracken-button>

						<lib-tracken-dropdown>
							<div
								trigger
								class="user-trigger"
							>
								<div class="avatar">{{ user.email[0].toUpperCase() }}</div>
								<span class="material-icons">expand_more</span>
							</div>
							<div menu>
								<a routerLink="/settings">
									<span class="material-icons">settings</span>
									{{ t('common.settings') }}
								</a>
								<button (click)="onLogout()">
									<span class="material-icons">logout</span>
									{{ t('common.logout') }}
								</button>
							</div>
						</lib-tracken-dropdown>
					}
				</nav>
			</header>

			<main>
				<router-outlet></router-outlet>
			</main>
		</div>

		<lib-tracken-toast-container></lib-tracken-toast-container>
	`,
	styleUrl: './app.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	private authFacade = inject(AuthFacade);
	public langService = inject(LanguageService);
	public themeService = inject(ThemeService);

	user$ = this.authFacade.user$;
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
