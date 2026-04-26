import { Component, inject, computed } from '@angular/core';
import { RouterOutlet, Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { TrackenPageHeader, TrackenCard, TrackenPage } from '@tracken/shared';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
	standalone: true,
	selector: 'app-settings',
	templateUrl: './settings.html',
	styleUrl: './settings.scss',
	imports: [
		CommonModule,
		RouterOutlet,
		RouterModule,
		TrackenPageHeader,
		TrackenCard,
		TrackenPage,
		TranslocoDirective,
	],
})
export class SettingsComponent {
	private router = inject(Router);

	// Cria um signal reativo da URL atual
	private currentUrl = toSignal(
		this.router.events.pipe(
			filter((event) => event instanceof NavigationEnd),
			map((event: any) => event.urlAfterRedirects || event.url),
			startWith(this.router.url),
		),
	);

	// Agora o isHome vai reagir sempre que a URL mudar
	isHome = computed(() => {
		const url = this.currentUrl();
		return url === '/settings' || url === '/settings/';
	});

	menuItems = [
		{
			id: 'profile',
			icon: 'person',
			route: 'profile',
			titleKey: 'settings.profile',
			descriptionKey: 'settings.profileDesc',
		},
		{
			id: 'appearance',
			icon: 'palette',
			route: 'appearance',
			titleKey: 'settings.preferences',
			descriptionKey: 'settings.appearanceDesc',
		},
		{
			id: 'security',
			icon: 'lock_person',
			route: 'security',
			titleKey: 'settings.account',
			descriptionKey: 'settings.securityDesc',
		},
	];
}
